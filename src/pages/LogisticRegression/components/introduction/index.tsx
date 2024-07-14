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
        <Text strong> Logistic regression </Text>
        is a statistical method used to model the probability of a certain
        class or event existing such as pass/fail, win/lose, alive/dead or
        healthy/sick. It is a type of regression analysis used for predicting
        the outcome of a categorical dependent variable based on one or more
        predictor variables.
      </Paragraph>
      <Paragraph>
        The logistic model can be represented by a logistic function which
        maps the predicted values to probabilities. The logistic function is
        defined as the natural logarithm of the odds that the dependent
        variable is a success, also known as the logit function.
      </Paragraph>
      <Paragraph>
        The training process of logistic regression involves optimizing the
        parameters of the model to maximize the likelihood of the observed
        data. This is typically done using a method called maximum likelihood
        estimation (MLE).
      </Paragraph>
      <Paragraph>
        In the forward propagation stage, the predicted probability is
        calculated based on the current regression coefficients. The loss is
        then calculated using a loss function such as binary cross-entropy.
      </Paragraph>
      <Paragraph>
        In the backpropagation stage, the gradient of the loss function with
        respect to the regression coefficients is calculated. The regression
        coefficients are then updated using optimization algorithms like
        stochastic gradient descent (SGD).
      </Paragraph>
      <Paragraph>
        The training process is repeated for multiple epochs until the loss
        converges to a certain range or the preset number of epochs is
        reached.
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
