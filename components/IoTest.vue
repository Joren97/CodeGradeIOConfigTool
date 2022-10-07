<template>
  <div class="card mb-3">
    <header class="card-header has-background-info">
      <p class="card-header-title has-text-white">
        {{ config.name }}
      </p>
    </header>
    <div class="card-content">
      <div class="columns">
        <div class="column">
          <b-field label="Input">
            <b-input type="textarea" v-model="config.stdin"></b-input>
          </b-field>
          <b-field label="Output">
            <b-input type="textarea" v-model="config.output"></b-input>
          </b-field>
        </div>
        <div class="column">
          <div class="box">
            <draggable
              v-model="inputSequence"
              :empty-insert-threshhold="500"
              group="inputs"
            >
              <b-tag class="ml-1" v-for="element in inputSequence" :key="element">{{
                element.value
              }}</b-tag>
            </draggable>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-checkbox v-model="caseInsensitive" type="is-info"
            >Case insensitive</b-checkbox
          >
          <b-checkbox v-model="ignoreTrailingWhitespace" type="is-info"
            >Ingore trailing whitespace</b-checkbox
          >
          <b-checkbox v-model="ignoreAllWhitespace" type="is-info"
            >Ignore all whitespace</b-checkbox
          >
          <b-checkbox v-model="substring" type="is-info">Substring</b-checkbox>

          <b-checkbox v-model="regex" type="is-info">Regex</b-checkbox>

          <b-checkbox v-model="hidden" type="is-info">Hidden</b-checkbox>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <b-numberinput
            type="is-info is-light"
            step="0.5"
            aria-minus-label="Decrement by 0.01"
            aria-plus-label="Increment by 0.01"
            v-model="weight"
          >
          </b-numberinput>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, NextTick } from "nuxt-property-decorator";
import { Input, Options } from "~/models/IoTest";
import { getData, Types } from "~/utils/data";

@Component({
  name: "IoTest",
})
export default class IoTest extends Vue {
  rbInput = null;
  @Prop({ default: null })
  config!: Input;

  @Prop({ default: 0 })
  min!: number;

  @Prop({ default: 0 })
  max!: number;

  get inputSequence(): Array<{ id: number; value: string; type: Types }> {
    console.log("Getting");
    const val = this.config.inputSequence;

    this.config.stdin = "";
    const count = val.length;

    for (let i = 0; i < val.length; i++) {
      const element = val[i];
      const nexElement = val[i + 1];
      let newLine = "\n";

      if (nexElement != undefined && nexElement.type == Types.sameLine) newLine = "";
      if (element.type == Types.sameLine) newLine = "";
      if (count == i + 1) newLine = "";

      this.config.stdin += getData(element.type, this.min, this.max) + newLine;
    }
    return val;
  }

  set inputSequence(val: Array<{ id: number; value: string; type: Types }>) {
    this.config.inputSequence = val;
    this.config.stdin = "";
    const count = val.length;

    for (let i = 0; i < val.length; i++) {
      const element = val[i];
      const nexElement = val[i + 1];
      let newLine = "\n";

      if (nexElement != undefined && nexElement.type == Types.sameLine) newLine = "";
      if (element.type == Types.sameLine) newLine = "";
      if (count == i + 1) newLine = "";

      this.config.stdin += getData(element.type, this.min, this.max) + newLine;
    }
  }

  get weight() {
    return this.config.weight;
  }

  set weight(value: number) {
    this.config.weight = value;
    this.$emit("ConfigChanged", this.config);
  }

  get hidden() {
    return this.config.hidden;
  }

  set hidden(value: boolean) {
    this.config.hidden = value;
    this.$emit("ConfigChanged", this.config);
  }

  get regex() {
    return this.config.options.includes(Options.regex);
  }

  set regex(value: boolean) {
    this.changeOptions(Options.regex, value);
  }

  get caseInsensitive() {
    return this.config.options.includes(Options.case);
  }

  set caseInsensitive(value: boolean) {
    this.changeOptions(Options.case, value);
  }

  get ignoreTrailingWhitespace() {
    return this.config.options.includes(Options.trailing_whitespace);
  }

  set ignoreTrailingWhitespace(value: boolean) {
    this.changeOptions(Options.trailing_whitespace, value);
  }

  get ignoreAllWhitespace() {
    return this.config.options.includes(Options.ignore_all_whitespace);
  }

  set ignoreAllWhitespace(value: boolean) {
    this.changeOptions(Options.ignore_all_whitespace, value);
  }

  get substring() {
    return this.config.options.includes(Options.substring);
  }

  set substring(value: boolean) {
    this.changeOptions(Options.substring, value);
  }

  changeOptions(option: Options, add: boolean) {
    if (add) {
      const index = this.config.options.indexOf(option);
      if (index != -1) return;
      this.config.options.push(option);
      this.$emit("ConfigChanged", this.config);
    } else {
      const index = this.config.options.indexOf(option);
      if (index == -1) return;
      this.config.options.splice(index, 1);
      this.$emit("ConfigChanged", this.config);
    }
  }
}
</script>
