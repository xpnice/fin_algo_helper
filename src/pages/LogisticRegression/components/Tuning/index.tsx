/// <reference path="./index.d.ts" />
/// <reference path="../../index.d.ts" />

import React, { Fragment, useState, useEffect } from "react";
import SparkMD5 from "spark-md5";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Select, InputNumber, Form, Button } from "antd";

import { LRTrain, LRTRainPropsType } from "../../../../utils/api";

import type { UploadProps } from "antd";

const { Dragger } = Upload;

// 从csv文件中提取首行
const extractCSVHeader = (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        const csvData = event.target.result as string;
        const lines = csvData.split("\n");
        const header = lines[0].split(",").map((item) => item.trim());
        resolve(header);
      } else {
        reject(new Error("Failed to read CSV file."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading CSV file."));
    };

    reader.readAsText(file);
  });
};

// 计算文件MD5
const calculateMD5 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();

    reader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target && event.target.result) {
        spark.append(event.target.result as ArrayBuffer);
        resolve(spark.end());
      } else {
        reject(new Error("Failed to read file for MD5 calculation."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading file for MD5 calculation."));
    };

    reader.readAsArrayBuffer(file);
  });
};

const Tuning: React.FC<LogisticRegressionPropsType> = ({ next }) => {
  const [form] = Form.useForm();

  const [allFeatures, setAllfeatures] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [submiting, setSubmiting] = useState(false);
  const [MD5, setMD5] = useState<string>("");

  const onFinish = async (value: LRTRainPropsType) => {
    setSubmiting(true);

    try {
      await LRTrain(Object.assign({}, { ...value, md5: MD5 }));
    } catch (error: any) {
      message.error(error);
    }
    setSubmiting(false);
    next();
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "http://msp23050s1.cs.hku.hk:8080/file/upload-csv",
    async onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        try {
          const allFeatures = await extractCSVHeader(
            info.file.originFileObj as File
          );
          const md5 = await calculateMD5(info.file.originFileObj as File);
          setMD5(md5);
          setAllfeatures(allFeatures);
        } catch (error) {
          console.error("Error extracting CSV header:", error);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleFirstSelectChange = (value: string[]) => {
    if (value.indexOf(form.getFieldValue("label")) === -1) {
      form.setFieldValue("label", null);
    }
    setSelectedFeatures(value);
  };

  useEffect(() => {
    // 初始设置 selectedFeatures 为表单中的默认值
    const initialFeatures = form.getFieldValue("features") || [];
    setSelectedFeatures(initialFeatures);
  }, [allFeatures, form]);

  return (
    <Fragment>
      Upload Your Dataset
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag your dataset to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a SINGLE *.CSV upload. Strictly prohibited from uploading
          company data or other banned files.
        </p>
      </Dragger>
      {allFeatures.length > 0 && (
        <Form
          form={form}
          name="basic"
          layout="vertical"
          labelCol={{ span: 16 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 800, marginTop: 16 }}
          initialValues={{ epoch: 80, features: allFeatures }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="Select the features you want" name="features">
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              maxTagCount="responsive"
              onChange={handleFirstSelectChange}
              options={allFeatures.map((feature) =>
                Object.assign({ value: feature, label: feature })
              )}
            />
          </Form.Item>

          <Form.Item
            label="Which feature would you like to predict"
            name="label"
            rules={[
              {
                required: true,
                message: "Please select a feature to predict!",
              },
            ]}
          >
            <Select
              placeholder="Please select"
              options={selectedFeatures.map((feature) =>
                Object.assign({ value: feature, label: feature })
              )}
            />
          </Form.Item>

          <Form.Item label="Determine you training batchsize" name="epoch">
            <InputNumber min={10} max={400} step={10} addonAfter="Epochs" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={submiting}>
              Start Training
            </Button>
          </Form.Item>
        </Form>
      )}
    </Fragment>
  );
};

export default Tuning;
