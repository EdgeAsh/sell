<template>
	<div class="star" v-bind:class="starType">
		<span class="star-item" v-for="itemClass in itemClasses" v-bind:class="itemClass"></span>
	</div>
</template>

<script>
// 定义变量，定义存储star个数
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
	props: {
		size: {
			type: Number
		},
		score: {
			type: Number
		}
	},
	computed: {
		starType(){
			return 'star-' + this.size;
		},
		itemClasses() {
			let arr = [];
			// 获取评分
			let score = Math.floor(this.score * 2)/2;
			// 有没有小数
			let hasDecimal = score % 1 !== 0;
			// 有多少个整星
			let integer = Math.floor(score);
			// 添加整星
			for(let i=0; i<integer; i++){
				arr.push(CLS_ON);
			}
			// 添加半星,最多只有一个
			if(hasDecimal) {
				arr.push(CLS_HALF);
			}
			// 补齐空位
			while(arr.length<LENGTH){
				arr.push(CLS_OFF);
			}

			return arr;
		}
	}
}
</script>

<style lang='stylus'>
	@import '../../common/stylus/mixin.styl'
	.star
		.star-item
			display:inline-block
			background-repeat:no-repeat
			background-size:100%
		&.star-48
			.star-item
				width:20px
				height:20px
				margin-right:22px
				&:last-child
					margin-right:0
				&.on
					bg-image('./star48_on')
				&.half
					bg-image('./star48_half')
				&.off
					bg-image('./star48_off')
		&.star-36
			.star-item
				width:15px
				height:15px
				margin-right:7px
				&:last-child
					margin-right:0
				&.on
					bg-image('./star36_on')
				&.half
					bg-image('./star36_half')
				&.off
					bg-image('./star36_off')
		&.star-24
			.star-item
				width:10px
				height:10px
				margin-right:4px
				&:last-child
					margin-right:0
				&.on
					bg-image('./star24_on')
				&.half
					bg-image('./star24_half')
				&.off
					bg-image('./star24_off')
			
</style>




















