export interface ITestcaseEntity {
  _id?: string;
  input: string;
  output: string;
  problemId: string;
  example?: boolean;
}
