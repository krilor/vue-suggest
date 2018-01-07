<template>
  <div class="suggest-search">
    <input
      v-model="keyword"
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
      debounce: {
        type: Number,
        required: false,
        default: 0
      }
    },
    data () {
      return {
        isOpen: false,
        highlightedPosition: NaN,
        keyword: '',
        timeout: undefined
      }
    },
    methods: {
      /**
       * Used to provide a default value-string in the slot for the options.
       * This method is not used when the scoped slot is used
       */
      defaultValue( option ) {
        if ( typeof option === 'string' ) {
          return option
        } else if ( typeof option === 'object' ) {
          return String(option[Object.keys(option)[0]]) // returns one (random) string value
        } else {
          return ''
        }
      },
      moveDown () {
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
      moveUp () {
        if (!this.isOpen) {
          return
        }
        this.highlightedPosition = this.highlightedPosition - 1 < 0
          ? this.options.length - 1
          : this.highlightedPosition - 1
      },
      select () {
        const selectedOption = this.options[this.highlightedPosition]
        this.isOpen = false
        this.$emit('select', selectedOption)
      },
      settle () {
        if ( this.isOpen && !isNaN(this.highlightedPosition) ) {
          this.select()
        } else {
          this.$emit( 'search', this.keyword )
        }
      }
    },
    watch: {
      /**
      * Method bound to the input event
      * $emits the current keyword types in autocomplete event
      */
      keyword: function() {

        this.isOpen = !!this.keyword
        this.highlightedPosition = NaN

        if ( this.keyword ) {
          this.$emit('change', this.keyword)
        }

        if ( this.timeout !== undefined ){
          clearTimeout(this.timeout)
        }

        this.timeout = setTimeout( () => { // need fat arrow function to preserve "this"
          this.$emit('autocomplete', this.keyword)
          this.timeout = undefined
        }, this.debounce )

      }
    }
  }

</script>