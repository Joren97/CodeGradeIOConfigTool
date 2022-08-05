<template>
  <div class="section">
    <div class="columns">
      <div class="column is-7-widescreen is-8-fullhd">
        <io-test
          v-for="(c, index) in configs"
          :key="index"
          :config="c"
          @ConfigChanged="configChanged"
        />
      </div>
      <div class="column sticky-column">
        <div class="box">
          <b-field>
            <b-checkbox-button
              v-for="i in amountOfCheckboxes"
              :key="i"
              v-model="radioButton"
              :native-value="i - 1"
              type="is-dark"
            >
              <span v-if="i - 1 == 0">All</span>
              <span v-else>Test {{ i - 1 }}</span>
            </b-checkbox-button>
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
        </div>
        <div class="box">
          <b-field label="Aantal testen">
            <b-numberinput
              expanded
              type="is-info is-light"
              aria-minus-label="Decrement"
              aria-plus-label="Increment"
              v-model="amountOfTests"
              @input="onChangeOfAmountOfTests"
            >
            </b-numberinput>
          </b-field>
          <b-field label="Weight per test">
            <b-numberinput
              expanded
              type="is-info is-light"
              aria-minus-label="Decrement"
              aria-plus-label="Increment"
              v-model="generalWeight"
            >
            </b-numberinput>
          </b-field>
        </div>
        <div class="box">
          <b-field label="assignment ID">
            <b-input placeholder="AssignmentId" v-model="assignmentId"></b-input>
          </b-field>
          <b-field label="Bestandsnaam">
            <b-input placeholder="Bestandsnaam" v-model="filename"></b-input>
          </b-field>
          <b-field>
            <b-button expanded @click="download">Download</b-button>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { Types, getData } from "~/utils/data";
import { Input, IoTestConfig } from "~/models/IoTest";

@Component({
  name: "Home",
  head: {
    title: "Home",
  },
})
export default class Index extends Vue {
  radioButton: Array<number> = [0];
  addNewLine = true;
  configs: Array<Input> = [
    new Input(0, false),
    new Input(1, false),
    new Input(2, false),
    new Input(3, false),
    new Input(4, false),
    new Input(5, false),
  ];
  assignmentId: number = 0;
  filename: string = "";
  min: number = 0;
  max: number = 10;
  amountOfTests: number = 6;
  generalWeight: number = 1;

  buttons = [
    { content: "Volledige naam", type: Types.full_name },
    { content: "Voornaam", type: Types.first_name },
    { content: "Familienaam", type: Types.last_name },
    { content: "Nieuwe lijn", type: Types.newline },
    { content: "Boolean", type: Types.boolean },
    { content: "Datum toekomst", type: Types.futureDate },
    { content: "Datum verleden", type: Types.pastDate },
    { content: "Datum ongeldig", type: Types.invalidDate },
    { content: "Getal", type: Types.number },
  ];

  get amountOfCheckboxes(): number {
    return this.configs.length + 1;
  }

  download() {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(
          JSON.stringify(
            // IoTestConfig.CreateCompleteConfig(this.assignmentId, this.configs)
            this.configs
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

  onChangeOfAmountOfTests = (newAmount: number) => {
    const currentAmount = this.configs.length;

    if (currentAmount > newAmount) {
      this.configs.pop();
    } else {
      this.configs.push(new Input(newAmount - 1, true));
    }

    this.configs = this.configs;
  };

  addInput(type: Types) {
    const newLine = this.addNewLine ? "\n" : "";

    if (this.radioButton.includes(0)) {
      this.configs = this.configs.map((element) => {
        element.stdin += getData(type, this.min, this.max) + newLine;
        return element;
      });
    } else {
      this.radioButton.forEach((index) => {
        this.configs[index - 1].stdin += getData(type, this.min, this.max) + newLine;
      });
    }
  }
}
</script>
<style scoped>
.sticky-column {
  height: calc(100vh - 3rem);
  top: 0;
  position: sticky;
}
</style>
