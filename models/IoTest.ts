const getTotalWeight = (configs: Array<Input>) => {
  let total = 0;
  configs.forEach(x => (total += x.weight));
  return total;
};

const getCompleteName = (configs: Array<Input>) => {
  const indexes = configs.map(x => x.index).sort();
  return "Test " + indexes.join();
};

export abstract class IoTestConfig {
  public static CreateCompleteConfig(
    assignmentId: number,
    configs: Array<Input>
  ): IoTest {
    const visibleConfigs = configs.filter(x => {
      return !x.hidden;
    });
    const visibleStep: Step = {
      description: "",
      weight: getTotalWeight(visibleConfigs),
      data: {
        inputs: visibleConfigs,
        program: "mono program.exe"
      },
      hidden: false,
      name: getCompleteName(visibleConfigs),
      type: "io_test"
    };

    const hiddenConfigs = configs.filter(x => {
      return x.hidden;
    });
    const hiddenStep: Step = {
      description: "",
      weight: getTotalWeight(hiddenConfigs),
      data: {
        inputs: hiddenConfigs,
        program: "mono program.exe"
      },
      hidden: true,
      name: getCompleteName(hiddenConfigs),
      type: "io_test"
    };

    return {
      assignmentId,
      steps: [visibleStep, hiddenStep]
    };
  }
}

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
