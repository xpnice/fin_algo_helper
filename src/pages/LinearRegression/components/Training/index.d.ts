interface ServerToClientEvents {
  epochData: (message: string) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}


// 定义数据结构的类型
interface EpochData {
    epoch: number;
    weights: number[][];
    bias: number[];
    loss: number;
  }