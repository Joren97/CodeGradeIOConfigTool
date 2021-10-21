export interface Input {
  name: string;
  args: string;
  weight: number;
  stdin: string;
  output: string;
  hidden: boolean;
  options: string[];
  index: number;
}

export interface Data {
  inputs: Input[];
  program: string;
}

export interface Step {
  name: string;
  data: Data;
  hidden: boolean;
  description: string;
  weight: number;
  type: string;
}

export interface IoTest {
  assignmentId: number;
  steps: Step[];
}

export const enum Options {
    case_insensitive = "case_insensitive",    
    ignore_trailing_whitespace = "ignore_trailing_whitespace",
	ignore_all_whitespace = "ignore_all_whitespace",
	substring = "substring",
	regex = "regex"
}
