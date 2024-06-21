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

const LogisticRegressionDescription: React.FC<LogisticRegressionPropsType> = ({
  next,
}) => {
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
          <Text strong> Logistic Regresion </Text>
          is a statistical method used to analyze the relationship between the
          dependent variable and one or more independent variables. The basic
          principle is to establish a mathematical model by assuming a linear
          relationship between the dependent variable and the independent
          variable. This linear model can be represented as the dependent
          variable being equal to the weighted sum of the independent variables
          plus a constant term and an error term.
        </Paragraph>
        <Paragraph>
          Once the model is established, it needs to be evaluated. The commonly
          used evaluation metric is mean squared error (MSE), which represents
          the average of the sum of squared errors between predicted and actual
          values;
        </Paragraph>
        <Paragraph>
          The training process of Logistic Regresion is divided into two stages:
          forward propagation and backward propagation.
        </Paragraph>
        <Paragraph>
          In the forward propagation stage, the predicted value is calculated
          based on the current regression coefficient, and then the loss is
          calculated based on this predicted value and the given true value.
        </Paragraph>
        <Paragraph>
          In the backpropagation stage, calculate the gradient of the loss
          function on the regression coefficients, and then use the method of
          stochastic gradient descent (SGD) to update the regression
          coefficients.
        </Paragraph>
        <Paragraph>
          Each epoch will repeat the above process until the loss converges to a
          certain range or reaches the preset number of epochs.
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

export default LogisticRegressionDescription;
