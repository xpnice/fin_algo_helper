import React, { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Input, Button, Form } from "antd";
import ReactECharts from "echarts-for-react";
import "./index.css"; // 引入自定义样式

const DecisionTreeVisualizer: React.FC = () => {
  const [socket, setWebSocket] = useState<Socket | null>(null);
  const [treeData, setTreeData] = useState<any>(null);
  const [highlightPath, setHighlightPath] = useState<string[]>([]);
  const [form] = Form.useForm();

  const initWebSocket = useCallback(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("Decision Tree, WebSocket Connected!!!", socket);
      socket.emit("hello", "hello");
    });
    socket.on("treeData", (message: any) => {
      console.log("Received tree data:", message);
      setTreeData(message);
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

  useEffect(() => {
    setWebSocket(
      io("http://localhost:8081", {
        transports: ["websocket", "polling"],
      }).connect()
    );
  }, []);

  useEffect(() => {
    initWebSocket();
  }, [socket, initWebSocket]);

  // 模拟WebSocket连接并发送数据
  useEffect(() => {
    // 模拟生成数据
    const generateMockTreeData = () => {
      return [
        0,
        9.231204438780908,
        [2, 9.817104578611136, [4, 9.237946173008506, 0, 1], 1],
        1,
      ];
    };

    const mockData = generateMockTreeData();
    setTreeData(mockData);
  }, []);

  const generateTree = (node: any, path: string = "0"): any => {
    if (typeof node === "number") {
      return {
        name: `Class ${node}`,
        itemStyle: { color: highlightPath.includes(path) ? "red" : "blue" },
        lineStyle: { color: highlightPath.includes(path) ? "red" : "gray" },
      };
    }
    const [feature, threshold, left, right] = node;
    return {
      name: `Feature ${feature} < ${threshold.toFixed(2)}`,
      itemStyle: { color: highlightPath.includes(path) ? "red" : "blue" },
      children: [
        generateTree(left, `${path}-0`),
        generateTree(right, `${path}-1`),
      ],
      lineStyle: { color: highlightPath.includes(path) ? "red" : "gray" },
    };
  };

  const handleSubmit = (values: any) => {
    const features = values.features.split(",").map(Number);
    const path = [];
    let node = treeData;
    let currentPath = "0";
    while (typeof node !== "number") {
      const [feature, threshold, left, right] = node;
      path.push(currentPath);
      if (features[feature] < threshold) {
        currentPath += "-0";
        node = left;
      } else {
        currentPath += "-1";
        node = right;
      }
    }
    path.push(currentPath); // 最后一个叶节点路径
    setHighlightPath(path);
  };

  const treeOption = treeData
    ? {
        series: [
          {
            type: "tree",
            data: [generateTree(treeData)],
            top: "1%",
            left: "7%",
            bottom: "1%",
            right: "20%",
            symbolSize: 12,
            label: {
              position: "left",
              verticalAlign: "middle",
              align: "right",
              fontSize: 12,
            },
            leaves: {
              label: {
                position: "right",
                verticalAlign: "middle",
                align: "left",
              },
            },
            expandAndCollapse: true,
            initialTreeDepth: 3,
            animationDuration: 550,
            animationDurationUpdate: 750,
          },
        ],
      }
    : {};

  return (
    <div>
      <ReactECharts
        option={treeOption}
        style={{
          height: "calc(-270px + 100vh - 253px)",
          width: "100%",
          marginBottom: -5,
        }}
      />
      <Form
        form={form}
        layout="inline"
        onFinish={handleSubmit}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          name="features"
          label="Features"
          rules={[{ required: true, message: "Please input features!" }]}
        >
          <Input placeholder="e.g., 5.1, 3.5, 1.4, 0.2" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DecisionTreeVisualizer;
