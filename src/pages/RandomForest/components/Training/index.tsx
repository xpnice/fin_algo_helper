import React, { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Input, Button, Form, Row, Col, Card, List } from "antd";
import ReactECharts from "echarts-for-react";
import "./index.css"; // 引入自定义样式

const RandomForestVisualizer: React.FC = () => {
  const [socket, setWebSocket] = useState<Socket | null>(null);
  const [forestData, setForestData] = useState<any[]>([]);
  const [highlightPaths, setHighlightPaths] = useState<string[][]>([]);
  const [classificationResults, setClassificationResults] = useState<number[]>(
    []
  );
  const [form] = Form.useForm();

  const initWebSocket = useCallback(() => {
    if (!socket) return;
    socket.on("connect", () => {
      console.log("Random Forest, WebSocket Connected!!!", socket);
      socket.emit("hello", "hello");
    });
    socket.on("forestData", (message: any[]) => {
      console.log("Received forest data:", message);
      setForestData(message);
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
    // 模拟生成随机森林数据
    const generateMockForestData = () => {
      return [
        [
          2,
          5.529387663128954,
          [1, 1.296898164322866, 0, [1, 1.858881453107453, 1, 0]],
          [1, 7.371269519847853, [1, 5.021421102495577, 1, 0], 1],
        ],
        [
          1,
          9.237946173008506,
          [2, 0.3581085910571457, 0, [2, 1.867462391803153, 1, 0]],
          1,
        ],
        [
          0,
          8.269083096094441,
          [
            2,
            8.767760996015816,
            [2, 7.913719436735343, 0, 0],
            [1, 1.7964015741157469, 1, 1],
          ],
          [2, 9.34585208549884, 1, 0],
        ],
        [
          1,
          3.7357581077318094,
          [1, 1.9282494555795004, [1, 1.013274900026412, 0, 0], 0],
          [0, 8.269083096094441, [2, 8.41932167793107, 1, 0], 1],
        ],
        [
          2,
          7.65218592217122,
          [2, 6.880421070051726, [0, 9.237946173008506, 0, 1], 0],
          [2, 8.534278919408361, 1, [2, 9.151489721698823, 0, 1]],
        ],
        [
          2,
          5.400446646798889,
          [2, 0.3514395300748807, 1, [1, 6.177127860082399, 0, 0]],
          [1, 7.371269519847853, [1, 2.7493526249736067, 1, 0], 1],
        ],
        [
          2,
          1.296898164322866,
          0,
          [
            1,
            5.354712509090661,
            [0, 0.9829267608643466, 1, 0],
            [2, 5.092996948663483, 1, 1],
          ],
        ],
        [
          1,
          9.087952719884203,
          [
            0,
            4.820224425695416,
            [1, 1.7480096205709494, 1, 0],
            [1, 3.7357581077318094, 0, 1],
          ],
          1,
        ],
        [
          2,
          8.730988470329448,
          [
            0,
            5.945525714368394,
            [0, 5.092996948663483, 0, 0],
            [1, 5.488430189178547, 0, 1],
          ],
          [2, 9.301392865276604, [1, 1.7964015741157469, 0, 1], 1],
        ],
        [
          0,
          5.120633520330187,
          [
            1,
            8.650779323780606,
            [2, 8.44451760796643, 0, 0],
            [0, 4.140800632458534, 1, 0],
          ],
          [0, 6.36550076953729, 1, [1, 5.676556864848822, 1, 0]],
        ],
      ];
    };

    const mockData = generateMockForestData();
    setForestData(mockData);
  }, []);

  const generateTree = (
    node: any,
    path: string = "0",
    treeIndex: number
  ): any => {
    if (typeof node === "number") {
      return {
        name: `Class ${node}`,
        itemStyle: {
          color: highlightPaths[treeIndex]?.includes(path) ? "red" : "blue",
        },
        lineStyle: {
          color: highlightPaths[treeIndex]?.includes(path) ? "red" : "gray",
        },
      };
    }
    const [feature, threshold, left, right] = node;
    return {
      name: `Feature ${feature} < ${threshold.toFixed(2)}`,
      itemStyle: {
        color: highlightPaths[treeIndex]?.includes(path) ? "red" : "blue",
      },
      children: [
        generateTree(left, `${path}-0`, treeIndex),
        generateTree(right, `${path}-1`, treeIndex),
      ],
      lineStyle: {
        color: highlightPaths[treeIndex]?.includes(path) ? "red" : "gray",
      },
    };
  };

  const handleSubmit = (values: any) => {
    const features = values.features.split(",").map(Number);
    const paths = forestData.map((tree) => {
      const path = [];
      let node = tree;
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
      return path;
    });

    const results = forestData.map((tree) => {
      let node = tree;
      while (typeof node !== "number") {
        const [feature, threshold, left, right] = node;
        if (features[feature] < threshold) {
          node = left;
        } else {
          node = right;
        }
      }
      return node;
    });

    setHighlightPaths(paths);
    setClassificationResults(results);
  };

  const forestOption = forestData.map((tree, index) => ({
    series: [
      {
        type: "tree",
        data: [generateTree(tree, "0", index)],
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
        roam: true, // Enable zoom and pan
      },
    ],
  }));

  return (
    <div>
      <Row gutter={[16, 16]}>
        {forestOption.map((option, index) => (
          <Col span={12} key={index}>
            <Card title={`Tree ${index + 1}`}>
              <ReactECharts
                key={index}
                option={option}
                style={{
                  height: "400px",
                  width: "100%",
                }}
              />
            </Card>
          </Col>
        ))}
      </Row>
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
          <Input placeholder="e.g., 1.2, 2.3, 3.1" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Card title="Classification Results" style={{ marginTop: 20 }}>
        <List
          dataSource={classificationResults}
          renderItem={(result, index) => (
            <List.Item>
              <div>
                Tree {index + 1}: Class {result}
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default RandomForestVisualizer;
