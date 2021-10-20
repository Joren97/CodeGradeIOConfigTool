<template>
  <div class="box content">
    <h1 class="title">Test 1</h1>
    <div class="columns">
      <div class="column">
        <b-field label="Input">
          <b-input type="textarea" size="is-small" v-model="input"></b-input>
        </b-field>
        <b-field label="Output">
          <b-input type="textarea" size="is-small"></b-input>
        </b-field>
      </div>
      <div class="column is-narrow">
        <div class="columns">
          <div class="column is-narrow">
            <b-field> <b-checkbox>Case insensitive</b-checkbox> </b-field>
            <b-field>
              <b-checkbox>Ingore trailing whitespace</b-checkbox>
            </b-field>
            <b-field> <b-checkbox>Ignore all whitespace</b-checkbox> </b-field>
            <b-field> <b-checkbox>Substring</b-checkbox> </b-field>
            <b-field> <b-checkbox>Regex</b-checkbox> </b-field>
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
          >
          </b-numberinput>
        </b-field>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "nuxt-property-decorator";
import { getDate, getFirstname, getLastname } from "~/utils/data";

@Component({
  name: "IoTest",
})
export default class IoTest extends Vue {
  rbInput = null;
  @Prop()
  input: string;
}
</script>