/// <reference path="./index.d.ts" />

import React, { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Table } from "antd";
import ReactECharts from "echarts-for-react";
import "./index.css"; // 引入自定义样式

const LinearRegressionTrain: React.FC = () => {
  const [socket, setWebSocket] = useState<Socket>(
    io("http://119.8.26.109:8081", {
      transports: ["websocket", "polling"],
    })
  );

  const [epochDataList, setEpochDataList] = useState<EpochData[]>([]);
  const [lossChartData, setLossChartData] = useState<
    { epoch: number; loss: number }[]
  >([]);

  // socket连接成功后初始化监听事件
  const initWebSocket = useCallback(() => {
    socket.on("connect", () => {
      console.log("Linear Regression, WebSocket Connected!!!");
      socket.emit("hello", "hello");
    });
    socket.on("epochData", (message: EpochData) => {
      console.log("收到信息:", message);
      setEpochDataList((prevData) => [...prevData, message]);
      setLossChartData((prevData) => [
        ...prevData,
        { epoch: message.epoch, loss: message.loss },
      ]);
    });
    socket.on("connect_error", (error: Error) => {
      console.log("connection error!");
      console.log(error);
    });
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  // 首次渲染尝试连接websocket
  useEffect(() => {
    setWebSocket(socket.connect());
  }, [socket]);

  // socket连接成功
  useEffect(() => {
    if (socket) {
      initWebSocket();
    }
  }, [socket, initWebSocket]);

  //   // 模拟WebSocket连接并发送数据
  //   useEffect(() => {

  //     // 模拟生成数据
  //     const generateMockData = (epoch: number): EpochData => {
  //       const weights = Array.from({ length: 10 }, () => [Math.random()]); // 假设10个权重
  //       const bias = [Math.random()];
  //       const loss = Math.random();
  //       return { epoch, weights, bias, loss };
  //     };

  //     let epoch = 1;
  //     const interval = setInterval(() => {
  //       const mockData = generateMockData(epoch++);
  //       setEpochDataList((prevData) => [mockData, ...prevData]);
  //       setLossChartData((prevData) => [
  //         ...prevData,
  //         { epoch: mockData.epoch, loss: mockData.loss },
  //       ]);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, []);

  // 动态生成表格的列定义
  const generateColumns = () => {
    const baseColumns = [
      {
        title: "Epoch",
        dataIndex: "epoch",
        key: "epoch",
        fixed: "left", // 固定epoch列
        width: 70,
      },
    ];

    if (epochDataList.length > 0) {
      const weightsCount = epochDataList[0].weights.length;
      const weightColumns = Array.from(
        { length: weightsCount },
        (_, index) => ({
          title: `Weight ${index + 1}`,
          dataIndex: `weight${index + 1}`,
          key: `weight${index + 1}`,
        })
      );
      return [
        ...baseColumns,
        ...weightColumns,
        {
          title: "Bias",
          dataIndex: "bias",
          key: "bias",
        },
        {
          title: "Loss",
          dataIndex: "loss",
          key: "loss",
        },
      ];
    }

    return baseColumns;
  };

  // 处理表格数据
  const tableData = epochDataList.map((item, index) => {
    const weights = item.weights.reduce((acc, weight, idx) => {
      acc[`weight${idx + 1}`] = weight[0];
      return acc;
    }, {} as Record<string, number>);
    return {
      key: index,
      epoch: item.epoch,
      ...weights,
      bias: item.bias[0],
      loss: item.loss,
    };
  });

  // ECharts的配置
  const chartOption = {
    title: {
      text: "Loss Over Epochs",
    },
    xAxis: {
      type: "category",
      data: lossChartData.map((item) => item.epoch),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: lossChartData.map((item) => item.loss),
        type: "line",
        smooth: true,
      },
    ],
  };

  return (
    <div>
      <ReactECharts
        option={chartOption}
        style={{
          height: "calc(-270px + 100vh - 253px)",
          width: "100%",
          marginBottom: -5,
        }}
      />
      <div>
        <Table
          bordered
          columns={generateColumns()}
          dataSource={tableData}
          pagination={{ size: "small", pageSize: 5 }}
          scroll={{ x: "max-content" }}
          style={{ marginBottom: -17 }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default LinearRegressionTrain;
