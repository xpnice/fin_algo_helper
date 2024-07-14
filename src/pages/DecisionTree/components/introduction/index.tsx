/// <reference path="./index.d.ts" />
/// <reference path="../../index.d.ts" />

import React from "react";
import { TinyColor } from "@ctrl/tinycolor";
import { Typography, ConfigProvider, Button } from "antd";

const { Paragraph, Text } = Typography;

const colors1 = ["#6253E1", "#04BEFE"];
const getHoverColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const DecisionTreeDescription: React.FC<DecisionTreePropsType> = ({ next }) => {
  return (
    <div style={{ padding: "10vh 0 0 0", maxWidth: "800px", margin: "auto" }}>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 16,
            /* 这里是你的全局 token */
          },
        }}
      >
        <Paragraph>
          <Text strong> Decision Tree </Text>
          is a non-parametric supervised learning method used for classification
          and regression. It splits the data into subsets based on the value of
          input features, creating a tree-like model of decisions and their
          possible consequences.
        </Paragraph>
        <Paragraph>
          The model is represented by a tree structure, where each internal node
          denotes a test on an attribute, each branch represents the outcome of
          the test, and each leaf node holds a class label (for classification)
          or a continuous value (for regression).
        </Paragraph>
        <Paragraph>
          The decision tree learning algorithm starts at the root node and
          splits the data based on the feature that results in the best possible
          split, usually measured by metrics such as Gini impurity or
          information gain.
        </Paragraph>
        <Paragraph>
          In the training process, the tree recursively partitions the data by
          selecting the optimal features to create branches until a stopping
          criterion is met, such as a maximum tree depth or a minimum number of
          samples per leaf.
        </Paragraph>
        <Paragraph>
          Pruning techniques may be applied to reduce the size of the tree and
          prevent overfitting, ensuring that the model generalizes well to
          unseen data.
        </Paragraph>
        <Paragraph>
          The prediction for a new data point is made by traversing the tree
          from the root to a leaf node, following the decisions in the nodes,
          and returning the value or class label of the leaf node.
        </Paragraph>
      </ConfigProvider>

      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                colors1
              ).join(", ")})`,
              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                colors1
              ).join(", ")})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Button type="primary" size="large" onClick={next}>
            TRY NOW!
          </Button>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default DecisionTreeDescription;
