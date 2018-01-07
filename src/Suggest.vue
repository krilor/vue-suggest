<template>
  <div class="suggest-search">
    <input
      v-model="keyword"
      class="input is-large"
      placeholder="Search..."
      @input="onInput($event.target.value)"
      @keyup.esc="isOpen = false"
      @keydown.down="moveDown"
      @keydown.up="moveUp"
      @keydown.enter="settle"
      @blur="isOpen = false">

    <ul class="options-list" v-show="isOpen">
      <li v-for="(option, index) in options"
        @mouseenter="highlightedPosition = index"
        @mousedown="select"
        :class="{'highlighted': index === highlightedPosition}">

        <!-- Scoped slot for displaying the actual list of options -->
        <slot name="item" :option="option"> {{ defaultValue( option ) }} </slot>

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
      defaultValue( option ) {
        if ( typeof option === 'string' ) {
          return option
        } else if ( typeof option === 'object' ) {
          return String(option[Object.keys(option)[0]]) // returns one (random) string value
        } else {
          return ''
        }
      },
      /**
       * Method bound to the input event
       * $emits the current keyword types in autocomplete event
       */
      onInput (value) {
        this.isOpen = !!value
        this.highlightedPosition = NaN

        if ( this.keyword ) {
          this.$emit('autocomplete', this.keyword)  
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
        this.keyword = selectedOption.stedsnavn
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
    }
  }

</script>