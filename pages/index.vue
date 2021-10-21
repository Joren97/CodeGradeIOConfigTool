<template>
  <div class="section">
    <div class="columns">
      <div class="column is-9">
        <io-test v-for="i in 6" :key="i" :config="configs[i - 1]" :index="i" 
        @ConfigChanged="configChanged"/>
      </div>
      <div class="column">
        <b-button class="mb-1" @click="addInput(1)" expanded>Voornaam</b-button>
        <b-button class="mb-1" @click="addInput(2)" expanded
          >Achternaam</b-button
        >
        <b-button class="mb-1" @click="addInput(4)" expanded>Datum</b-button>
        <b-button class="mb-1" @click="addInput(5)" expanded>Newline</b-button>
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
import { getDate, getFirstname, getLastname, Types } from "~/utils/data";
import { Input, Options } from "~/models/IoTest";

@Component({
  name: "Home",
  head: {
    title: "Home"
  }
})
export default class Index extends Vue {
  radioButton = null;
  configs: Array<Input> = [
    {
      index: 0,
      name: "Test 1",
      args: "",
      weight: 1,
      stdin: "",
      output: "",
      hidden: false,
      options: [
        Options.case_insensitive,
        Options.ignore_trailing_whitespace,
        Options.ignore_all_whitespace,
        Options.substring,
        Options.regex,
      ]
    },
    {
      index: 1,
      name: "Test 2",
      args: "",
      weight: 1,
      stdin: "",
      output: "",
      hidden: false,
      options: []
    },
    {
      index: 2,
      name: "Test 3",
      args: "",
      weight: 1,
      stdin: "",
      output: "",
      hidden: false,
      options: []
    },
    {
      index: 3,
      name: "Test 4",
      args: "",
      weight: 1,
      stdin: "",
      output: "",
      hidden: true,
      options: []
    },
    {
      index: 4,
      name: "Test 5",
      args: "",
      weight: 1,
      stdin: "",
      output: "",
      hidden: true,
      options: []
    },
    {
      index: 5,
      name: "Test 6",
      args: "",
      weight: 1,
      stdin: "",
      output: "",
      hidden: true,
      options: []
    }
  ];
  assignmentId = null;
  filename = null;

  download() {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify({ test: "test" }))
    );
    element.setAttribute("download", `${this.filename}.json`);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  configChanged(e: Input){
    console.log(e.options);
    console.log(e.hidden);
    console.log(e.weight);
    this.configs[e.index] = e;
    
  }

  addInput(value: Types) {
    console.log(value);
    console.log(Types.first_name);
    switch (value) {
      case Types.first_name:
        this.configs = this.configs.map(element => {
          element.stdin += getFirstname();
          return element;
        });
        break;
      case Types.last_name:
        this.configs = this.configs.map(element => {
          element.stdin += getLastname();
          return element;
        });
        break;
      case Types.date:
        this.configs = this.configs.map(element => {
          element.stdin += getDate();
          return element;
        });
        break;
      case Types.newline:
        this.configs = this.configs.map(element => {
          element.stdin += "\n";
          return element;
        });
        break;
    }
    console.log(this.configs);
  }
}
</script>
