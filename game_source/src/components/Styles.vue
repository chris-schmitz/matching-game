<template>
    <div class="style-container">
        <h1>h1 The Matching Game</h1>
        <h2>h2 The Matching Game</h2>
        <h3>h3 The Matching Game</h3>
        <h4>h4 The Matching Game</h4>
        <h5>h5 The Matching Game</h5>
        <h6>h6 The Matching Game</h6>
        <ul>
            <li>one</li>
            <li>two</li>
            <li>three</li>
        </ul>
        <ol>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ol>
        <a>a link looks like this</a>
        <p>this is a paragraph.</p>

        <p>These are cards on a board:</p>
        <div class="board">
            <div class="card">
            </div>
            <div class="card">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'splash',
        data () {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    @import '../style/colors';
    @import '../style/mixins';

    .style-container {
    }

    div {
        padding: 20px;
    }
    div > * {
        margin-bottom: 20px;
    }

    .board {
        display: flex;
        > * {margin: 10px;}
    }
    .card {
        @include card(120px, 100px, $hotpink);
    }
</style>
