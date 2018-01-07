# Vue-Suggest

## Simple autocomplete search component for Vue

This is a simple autocomplete search component for Vue.

### Why yet another autocomplete component?

Well, because I needed it in my own projects. The existing [awesome autocomplete components](https://github.com/vuejs/awesome-vue#autocomplete) didn't quite fit my needs.

### So, what makes it different?

This autocomplete component will be the component you need if you want:

* no styling
* no functionality for getting options from an endpoint.
* simple interface
* a customizable render/template for the options through [scoped slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots)

## Installation

### As a npm module

`npm install vue-suggest --save-dev`

Then just include it in your project

`import VueSuggest from 'vue-suggest'`

### Browser

Use the minified browser plugin version in [vue-suggest.plugin.js](dist/vue-suggest.plugin.js).
This plugin auto-installs once it is loaded in the browser - making the `vue-suggest` component available right away.

Just do

```html
<script src="https://unpkg.com/vue"></script>
<script src="../dist/vue-suggest.plugin.js"></script>
```

## Usage

See [the basic example](examples/basic.html)

### Customizing the template for each option in the list.

This is acieved through [scoped slots](https://vuejs.org/v2/guide/components.html#Scoped-Slots)

A slot named `item` is available in the component. The option data is passed in the prop `data`.
A sample customized item would for example be:

```html
<vue-suggest
    :options="options"
    @autocomplete="setKeyword"
    @select="logSelect"
    @search="logSearch">

    <!--
        Adding a template for the scoped slot.
        Notice that the slot-scope attribute can be name anything you like,
        and that the data prop is available within that scope.
    -->
    <template slot="item" slot-scope="myslotscope">
        <div class="my-scoped-slot-class">
            <strong>{{ myslotscope.data }}</strong>
        </div>
    </template>

</vue-suggest>
``` 

## Kudos

* Taha Shashtari for his [tutorial on Vue autocomplete with scoped slots](http://taha-sh.com/blog/building-an-awesome-reusable-autocomplete-input-component-in-vue-21-part-one)