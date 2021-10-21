<template>
  <div class="section">
    <div class="columns">
      <div class="column is-9">
        <io-test
          v-for="i in 6"
          :key="i"
          :config="configs[i - 1]"
          :index="i"
          @ConfigChanged="configChanged"
        />
      </div>
      <div class="column">
        <b-field>
          <b-radio-button
            v-model="radioButton"
            :native-value="0"
            type="is-dark is-outlined"
          >
            <b-icon icon="close"></b-icon>
            <span>All</span>
          </b-radio-button>

          <b-radio-button
            v-model="radioButton"
            :native-value="1"
            type="is-dark is-outlined"
          >
            <b-icon icon="check"></b-icon>
            <span>Test 1</span>
          </b-radio-button>

          <b-radio-button
            v-model="radioButton"
            :native-value="2"
            type="is-dark is-outlined"
          >
            <b-icon icon="check"></b-icon>
            <span>Test 2</span>
          </b-radio-button>

          <b-radio-button
            v-model="radioButton"
            :native-value="3"
            type="is-dark is-outlined"
          >
            <b-icon icon="check"></b-icon>
            <span>Test 3</span>
          </b-radio-button>

          <b-radio-button
            v-model="radioButton"
            :native-value="4"
            type="is-dark is-outlined"
          >
            <b-icon icon="check"></b-icon>
            <span>Test 4</span>
          </b-radio-button>

          <b-radio-button
            v-model="radioButton"
            :native-value="5"
            type="is-dark is-outlined"
          >
            <b-icon icon="check"></b-icon>
            <span>Test 5</span>
          </b-radio-button>

          <b-radio-button
            v-model="radioButton"
            :native-value="6"
            type="is-dark is-outlined"
          >
            <b-icon icon="check"></b-icon>
            <span>Test 6</span>
          </b-radio-button>
        </b-field>
        <b-field>
          <b-checkbox-button v-model="addNewLine" type="is-dark">
            <b-icon :icon="addNewLine ? `check` : `close`"></b-icon>
            <span>Nieuwe lijn toevoegen</span>
          </b-checkbox-button>
        </b-field>
        <b-field v-for="(button, index) in buttons" :key="index">
          <b-button @click="addInput(button.type)" expanded outlined>{{
            button.content
          }}</b-button>
        </b-field>

        <b-field>
          <b-numberinput
            type="is-info is-light"
            controls-alignment="left"
            controls-position="compact"
            aria-minus-label="Decrement"
            aria-plus-label="Increment"
            v-model="min"
            class="mr-1"
          >
          </b-numberinput>
          <b-numberinput
            type="is-info is-light"
            controls-alignment="right"
            controls-position="compact"
            aria-minus-label="Decrement"
            aria-plus-label="Increment"
            v-model="max"
            class="ml-1"
          >
          </b-numberinput>
        </b-field>

        <b-field class="mt-5">
          <b-button expanded @click="download">Download</b-button>
        </b-field>
        <b-field>
          <b-input placeholder="AssignmentId" v-model="assignmentId"></b-input>
        </b-field>
        <b-field>
          <b-input placeholder="Bestandsnaam" v-model="filename"></b-input>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Types, getData } from "~/utils/data";
import { Input, IoTestConfig, Options } from "~/models/IoTest";

@Component({
  name: "Home",
  head: {
    title: "Home",
  },
})
export default class Index extends Vue {
  radioButton: number = 0;
  addNewLine = true;
  configs: Array<Input> = [
    new Input(0, false),
    new Input(1, false),
    new Input(2, false),
    new Input(3, true),
    new Input(4, true),
    new Input(5, true),
  ];
  assignmentId: number = 0;
  filename: string = "";
  min: number = 0;
  max: number = 10;

  buttons = [
    { content: "Volledige naam", type: Types.full_name },
    { content: "Voornaam", type: Types.first_name },
    { content: "Familienaam", type: Types.last_name },
    { content: "Nieuwe lijn", type: Types.newline },
    { content: "Datum toekomst", type: Types.futureDate },
    { content: "Datum verleden", type: Types.pastDate },
    { content: "Datum ongeldig", type: Types.invalidDate },
    { content: "Getal", type: Types.number },
  ];

  download() {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          JSON.stringify(
            IoTestConfig.CreateCompleteConfig(this.assignmentId, this.configs)
          )
        )
    );
    element.setAttribute("download", `${this.filename}.json`);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  configChanged(e: Input) {
    this.configs[e.index] = e;
  }

  addInput(type: Types) {
    const newLine = this.addNewLine ? "\n" : "";
    console.log(this.radioButton);
    switch (this.radioButton) {
      case 0:
        this.configs = this.configs.map((element) => {
          element.stdin += getData(type) + newLine;
          return element;
        });
        break;
      default:
        this.configs[this.radioButton - 1].stdin += getData(type) + newLine;
        break;
    }
  }
}
</script>
