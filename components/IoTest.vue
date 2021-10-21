<template>
  <div class="box content">
    <h1 class="title">{{ config.name }}</h1>
    <div class="columns">
      <div class="column">
        <b-field label="Input">
          <b-input
            type="textarea"
            size="is-small"
            v-model="config.stdin"
          ></b-input>
        </b-field>
        <b-field label="Output">
          <b-input
            type="textarea"
            size="is-small"
            v-model="config.output"
          ></b-input>
        </b-field>
      </div>
      <div class="column is-narrow">
        <div class="columns">
          <div class="column is-narrow">
            <b-field>
              <b-checkbox v-model="caseInsensitive"
                >Case insensitive</b-checkbox
              >
            </b-field>
            <b-field>
              <b-checkbox v-model="ignoreTrailingWhitespace"
                >Ingore trailing whitespace</b-checkbox
              >
            </b-field>
            <b-field>
              <b-checkbox v-model="ignoreAllWhitespace"
                >Ignore all whitespace</b-checkbox
              >
            </b-field>
            <b-field>
              <b-checkbox v-model="substring">Substring</b-checkbox>
            </b-field>
            <b-field> <b-checkbox v-model="regex">Regex</b-checkbox> </b-field>
            <b-field>
              <b-checkbox v-model="hidden">Hidden</b-checkbox>
            </b-field>
          </div>
          <div class="column is-narrow">
            <b-button type="mb-1" expanded>Voornaam</b-button>
            <b-button type="mb-1" expanded>Achternaam</b-button>
            <b-button type="mb-1" expanded>Datum</b-button>
            <b-button type="mb-1" expanded>Newline</b-button>
          </div>
        </div>
        <b-field>
          <b-numberinput
            step="0.5"
            aria-minus-label="Decrement by 0.01"
            aria-plus-label="Increment by 0.01"
            v-model="weight"
          >
          </b-numberinput>
        </b-field>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { Input, Options } from "~/models/IoTest";

@Component({
  name: "IoTest"
})
export default class IoTest extends Vue {
  rbInput = null;
  @Prop({default: null})
  config!: Input;

  @Prop()
  index!: number;

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
    return this.config.options.includes(Options.case_insensitive);
  }

  set caseInsensitive(value: boolean) {
    this.changeOptions(Options.case_insensitive, value);
  }

  get ignoreTrailingWhitespace() {
    return this.config.options.includes(Options.ignore_trailing_whitespace);
  }

  set ignoreTrailingWhitespace(value: boolean) {
    this.changeOptions(Options.ignore_trailing_whitespace, value);
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
