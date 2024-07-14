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

const RandomForestDescription: React.FC<RandomForestPropsType> = ({ next }) => {
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
          <Text strong> Random Forest </Text>
          is an ensemble learning method used for classification, regression,
          and other tasks that operates by constructing multiple decision trees
          during training and outputting the mode of the classes
          (classification) or mean prediction (regression) of the individual
          trees.
        </Paragraph>
        <Paragraph>
          The model consists of a collection of decision trees, each built on a
          random subset of the training data and features. The diversity among
          the trees is achieved through bagging (bootstrap aggregating) and
          feature randomness.
        </Paragraph>
        <Paragraph>
          During the training process, each tree in the forest is trained on a
          different subset of the data. This process introduces diversity among
          the trees, which helps in reducing the variance and preventing
          overfitting.
        </Paragraph>
        <Paragraph>
          The randomness in feature selection for splitting at each node ensures
          that the trees are decorrelated, further enhancing the robustness of
          the model.
        </Paragraph>
        <Paragraph>
          In the prediction phase, the input data is passed through all the
          trees in the forest. Each tree provides its prediction, and the final
          prediction is made based on the majority vote (for classification) or
          average (for regression) of all the trees' predictions.
        </Paragraph>
        <Paragraph>
          Random Forests are known for their high accuracy, ability to handle
          large datasets with higher dimensionality, and robustness to
          overfitting. They can also handle missing values and maintain accuracy
          even when a large proportion of the data is missing.
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

export default RandomForestDescription;
