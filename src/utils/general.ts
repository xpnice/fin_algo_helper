/**
 * 将 'subN-M' 格式的字符串转换为数字数组 [N, M]
 * @param str - 输入的字符串，例如 'sub1-2'
 * @returns 数字数组 [N, M]
 */
export function parseSubString(str: string): [number, number] {
  // 使用正则表达式匹配并捕获 N 和 M 的值
  const match = str.match(/^sider(\d+)-(\d+)$/);


  // 如果匹配成功，提取捕获的组并转换为数字
  if (match) {
    const N = parseInt(match[1], 10);
    const M = parseInt(match[2], 10);
    return [N, M];
  }

  // 如果匹配不成功，抛出错误
  throw new Error("Invalid input format");
}
