<template>
  <div class="suggest-search">
    <input
      ref="input"
      v-bind:value="value"
      v-on:input="updateValue($event.target.value)"
      class="input is-large"
      placeholder="Search..."
      @keyup.esc="isOpen = false"
      @keydown.down="moveDown"
      @keydown.up="moveUp"
      @keydown.enter="settle"
      @blur="isOpen = false">

    <ul class="options-list" v-show="isOpen">
      <li v-for="(option, index) in options" :key='index'
        @mouseenter="highlightedPosition = index"
        @mousedown="select"
        :class="{'highlighted': index === highlightedPosition}">

        <!-- Scoped slot for displaying the actual list of options -->
        <slot name="item" :data="option"> {{ defaultValue( option ) }} </slot>

      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'suggest-search',
    props: {
      options: {
        type: Array,
        required: true
      },
      value: {
        type: String,
        required: false
      }
    },
    data () {
      return {
        isOpen: false,
        highlightedPosition: NaN,
        keyword: ''
      }
    },
    methods: {
      /**
       * Used to provide a default value-string in the slot for the options.
       * This method is not used when the scoped slot is used
       */
      defaultValue: function( option ) {
        if ( typeof option === 'string' ) {
          return option
        } else if ( typeof option === 'object' ) {
          return String(option[Object.keys(option)[0]]) // returns one (random) string value
        } else {
          return ''
        }
      },
      moveDown: function() {
        if (!this.isOpen) {
          return
        }
        if (isNaN(this.highlightedPosition)) {
          this.highlightedPosition = 0
        } else {
          this.highlightedPosition =
          (this.highlightedPosition + 1) % this.options.length  
        }
        
      },
      moveUp: function() {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition = this.highlightedPosition - 1 < 0
          ? this.options.length - 1
          : this.highlightedPosition - 1
      },
      select: function() {
        const selectedOption = this.options[this.highlightedPosition]
        this.isOpen = false
        this.$emit('select', selectedOption)
      },
      settle: function() {
        if ( this.isOpen && !isNaN(this.highlightedPosition) ) {
          this.select()
        } else {
          this.$emit( 'search', this.value )
        }
      },
      /**
      * $emits the current value types in input event
      */
      updateValue: function(value) {
        this.isOpen = !!this.value
        this.highlightedPosition = NaN
        this.$emit('input', value)
      }
    }
  }

</script>