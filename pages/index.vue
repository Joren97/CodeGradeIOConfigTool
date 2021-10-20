<template>
  <div class="section">
    <div class="columns">
      <div class="column is-9">
        <io-test :input="inputs[0]" />
        <io-test :input="inputs[1]" />
        <io-test :input="inputs[2]" />
        <io-test :input="inputs[3]" />
        <io-test :input="inputs[4]" />
        <io-test :input="inputs[5]" />
      </div>
      <div class="column">
        <b-button class="mb-1" @click="addInput(1)" expanded>Voornaam</b-button>
        <b-button class="mb-1" @click="addInput(2)" expanded
          >Achternaam</b-button
        >
        <b-button class="mb-1" @click="addInput(3)" expanded>Datum</b-button>
        <b-button class="mb-1" @click="addInput(5)" expanded>Newline</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { getFirstname, Types } from "~/utils/data";

@Component({
  name: "Dashboard",
  head: {
    title: "Home",
  },
})
export default class Index extends Vue {
  radioButton = null;
  inputs = ["", "", "", "", "", ""];

  addInput(value: Types) {
    console.log(value);
    console.log(Types.first_name);
    switch (value) {
      case Types.first_name:
        this.inputs = this.inputs.map((element) => {
          return element + getFirstname();
        });
        break;
      case Types.newline:
        this.inputs = this.inputs.map((element) => {
          return element + "\n";
        });
        break;
    }
    console.log(this.inputs);
  }
}
</script>
