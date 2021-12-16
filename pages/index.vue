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
          <draggable v-model="myArray" :empty-insert-threshhold="500" 
          :group="{ name: 'inputs', pull: 'clone', put: false }">
          <div class="block" v-for="element in myArray" :key="element.id">
   {{element.value}}</div>
</draggable>
        </div>
        <div class="box">
          <b-field>
            <b-checkbox-button
              v-for="i in amountOfCheckboxes"
              :key="i"
              v-model="radioButton"
              :native-value="(i-1)"
              type="is-dark"
            >
              <span v-if="(i-1) == 0">All</span>
              <span v-else>Test {{i - 1}}</span>
            </b-checkbox-button>
          </b-field>
          <b-field>
            <b-checkbox-button v-model="addNewLine" type="is-dark">
              <b-icon :icon="addNewLine ? `check` : `close`"></b-icon>
              <span>Nieuwe lijn toevoegen</span>
            </b-checkbox-button>
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
            <b-input
              placeholder="AssignmentId"
              v-model="assignmentId"
            ></b-input>
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
  myArray = [
    { id:1, value: "Volledige naam", type: Types.full_name },
    { id:2, value: "Voornaam", type: Types.first_name },
    { id:3, value: "Familienaam", type: Types.last_name },
    { id:4, value: "Nieuwe lijn", type: Types.newline },
    { id:5, value: "Boolean", type: Types.boolean },
    { id:6, value: "Datum toekomst", type: Types.futureDate },
    { id:7, value: "Datum verleden", type: Types.pastDate },
    { id:8, value: "Datum ongeldig", type: Types.invalidDate },
    { id:9, value: "Getal", type: Types.number }
  ];
  radioButton: Array<number> = [0];
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
  amountOfTests: number = 6;
  generalWeight: number = 1;

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
        this.configs[index - 1].stdin +=
          getData(type, this.min, this.max) + newLine;
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