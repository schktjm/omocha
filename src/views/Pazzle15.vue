<template>
<div id="wrapper">
    <p>15 Pazzle</p>
    <div class="box-wrapper">
        <div v-for="(rows, i) in block" :key="`row-${rows}`">
            <span v-for="(x, j) in rows" :key="x">
                <span v-if="x === -1" class="none-block" @click="() => clickBlock(j, i)"></span>
                <span v-else class="one-block" @click="() => clickBlock(j, i)">{{
            x
          }}</span>
            </span>
        </div>
    </div>
    <p>{{ message }}</p>
</div>
</template>

<script>
export default {
    name: "pazzle-15",
    data() {
        return {
            n: 4,
            block: [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
                [13, 14, -1, 15],
            ],
            message: "",
        };
    },
    methods: {
        init() {
            let newArr = [...new Array(16).keys()];
            newArr[0] = -1;

            newArr.forEach((_, i) => {
                let r = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[r]] = [newArr[r], newArr[i]];
            });
            let newBlock = [...this.block];
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.n; j++) {
                    newBlock[i][j] = newArr[i * this.n + j];
                }
            }
            this.block = newBlock;
        },
        swichBlock(x0, y0, x1, y1) {
            let newBlock = [...this.block];
            [newBlock[y0][x0], newBlock[y1][x1]] = [
                newBlock[y1][x1],
                newBlock[y0][x0],
            ];
            this.block = newBlock;
        },
        clickBlock(x, y) {
            console.log(x, y);
            switch (true) {
                case this.checkTop(x, y):
                    this.swichBlock(x, y, x, y - 1);
                    break;
                case this.checkRight(x, y):
                    this.swichBlock(x, y, x + 1, y);
                    break;
                case this.checkBottom(x, y):
                    this.swichBlock(x, y, x, y + 1);
                    break;
                case this.checkLeft(x, y):
                    this.swichBlock(x, y, x - 1, y);
                    break;
                default:
                    break;
            }
            if (this.checkOrder()) {
                this.message = "Congratulations!";
            }
        },
        checkTop(x, y) {
            return y - 1 >= 0 && this.block[y - 1][x] === -1;
        },
        checkBottom(x, y) {
            return y + 1 < this.n && this.block[y + 1][x] === -1;
        },
        checkRight(x, y) {
            return x + 1 < this.n && this.block[y][x + 1] === -1;
        },
        checkLeft(x, y) {
            return x - 1 >= 0 && this.block[y][x - 1] === -1;
        },
        checkOrder() {
            return this.block.every((row, i) =>
                row.every(
                    (x, j) =>
                    i * this.n + j + 1 === x || (i === this.n - 1 && j === this.n - 1)
                )
            );
        },
    },
    mounted() {
        this.init();
    },
};
</script>

<style scoped>
#wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.box-wrapper {
    border: 0.25rem #42b983 solid;
    padding: 0.25rem;
    width: fit-content;
}

.one-block {
    box-sizing: border-box;
    display: inline-block;
    width: 3rem;
    height: 3rem;
    padding: 1rem;
    border: 1px grey solid;
}

.none-block {
    box-sizing: border-box;
    display: inline-block;
    width: 3rem;
}
</style>
