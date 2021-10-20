<template>
  <div class="section">
    <div class="box content">
      <h1 class="title">Test 1</h1>
      <div class="columns">
        <div class="column">
          <b-field label="Input">
            <b-input type="textarea" size="is-small"></b-input>
          </b-field>
          <b-field label="Output">
            <b-input type="textarea"  size="is-small"></b-input>
          </b-field>
        </div>
        <div class="column">
          <b-field> <b-checkbox>Case insensitive</b-checkbox> </b-field>
          <b-field> <b-checkbox>Ingore trailing whitespace</b-checkbox> </b-field>
          <b-field> <b-checkbox>Ignore all whitespace</b-checkbox> </b-field>
          <b-field> <b-checkbox>Substring</b-checkbox> </b-field>
          <b-field> <b-checkbox>Regex</b-checkbox> </b-field>
        </div>
      </div>
    </div>
    <div class="box content">
      <h1 class="title">Test 2</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component({
  name: "Dashboard",
  head: {
    title: "Home",
  },
})
export default class Index extends Vue {}
</script>
