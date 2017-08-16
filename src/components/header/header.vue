<template>
	<div class='header'>
		<div class="content-wrap clearfix">
			<div class="avatar">
				<img v-bind:src="seller.avatar" alt="avatar" width='64' height='64'>
			</div>
			<div class="content">
				<div class="title">
					<span class='brand'></span>
					<span class='name'>{{seller.name}}</span>
				</div>
				<div class="promise">
					<span>{{seller.description}}</span>/<span>{{seller.deliveryTime}}分钟送达</span>
				</div>
				<div class="support" v-if='seller.supports'>
				 	<span class='icon' v-bind:class="classMap[seller.supports[0].type]"></span><span>{{seller.supports[0].description}}</span>
				 	<span class="count" v-on:click="showDetail()">{{seller.supports.length}}个<i class="icon-keyboard_arrow_right"></i></span>
				</div>
			</div>
		</div>
		<div class="bulletin-wrap" v-on:click="showDetail()" >
			<span class="icon"></span>
			<span class="bulletin">{{seller.bulletin}}</span>
			<span class="icon-keyboard_arrow_right"></span>
		</div>
		<div class="background"><img v-bind:src="seller.avatar" alt="bg" width='100%' height='100%'></div>
		<transition name='fade' mode='out-in'>
		<div v-show='detailShow' class="detail">
			<div class="detail-wrap">
				<div class="detail-main">
					<h3 class='name'>{{seller.name}}</h3>
					<div class='star-wrap'>
						<star v-bind:size='48' v-bind:score='seller.score'></star>
					</div>
					
					<div class="title"><span class="line"></span><span class="text">优惠信息</span><span class="line"></span></div>
					<ul class="body" v-if="seller.supports">
						<li class="body-item" v-for="(support,index) in seller.supports"><span class='icon' v-bind:class="classMap[seller.supports[index].type]"></span><span>{{seller.supports[index].description}}</span>{{index}}</li>
					</ul>
					<div class="title"><span class="line"></span><span class="text">商家公告</span><span class="line"></span></div>
					<div class="body" v-if="seller.supports">
						<p class="bulletin">{{seller.bulletin}}</p>
					</div>
					
				</div>
			</div>
			<div class="detail-close">
				<span class="icon-close" v-on:click='hideDetail()'></span>
			</div>
		</div>
		</transition>
	</div>
</template>

<script>
import star from 'components/star/star.vue'

export default{
  props: {
  	seller: {
  		type: Object
  	}
  },
  methods: {
  	showDetail(){
  		this.detailShow = true;
  	},
  	hideDetail(){
  		this.detailShow = false;
  	}
  },
  components:{
  	star: star
  },
  data() {
  	return {
  		detailShow: false
  	};
  },
  created() {
  	this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
  
}
</script>

<style lang='stylus'>
	@import '../../common/stylus/mixin.styl'
	
	.header
		position:relative
		overflow:hidden
		color:#fff
		font-size:0px
		background-color:rgba(7,17,27,.5)
		.content-wrap
			display: flex
			padding:24px 12px 18px 24px
			.avatar
				flex:0 0 64px
				margin-right:18px
				img
					display:block
					border-radius:2px
			.content
				flex:1
				margin-top:2px
				.title
					font-size:16px
					font-weight:bold
					line-height:18px
					margin-bottom:8px
					.brand
						display:inline-block
						width:30px
						height:18px
						margin-right:6px
						bg-image('./brand')
						vertical-align:top
				.promise
					font-size:12px
					font-weight:200
					line-height:12px
					margin-bottom:10px
				.support
					position:relative
					font-size:10px
					font-weight:200
					line-height:12px
					margin-bottom:2px
					&>.icon
						display:inline-block
						width:12px
						height:12px
						margin-right:4px
						vertical-align:top
						&.decrease
							bg-image('./decrease_1')
						&.discount
							bg-image('./discount_1')
						&.guarantee
							bg-image('./guarantee_1')
						&.invoice
							bg-image('./invoice_1')
						&.special
							bg-image('./special_1')
					&>.count
						position:absolute
						right:0
						top:-7px
						padding:7px 8px
						background-color:rgba(0,0,0,.2)
						line-height: 12px
						font-size:10px;
						border-radius:14px;
						color:#fff
						.icon-keyboard_arrow_right
							font-style:normal
		.bulletin-wrap
			position:relative
			background-color:rgba(7,17,27,.1)
			height:28px
			overflow:hidden
			font-size:10px
			line-height:28px
			// vertical-align:middle
			.icon
				position:absolute
				display:inline-block
				left:12px
				width:22px
				height:12px
				border-radius:2px
				margin-top:8px
				margin-right:4px
				bg-image('./bulletin')
				vertical-align:middle
			.bulletin
				display:inline-block
				box-sizing:border-box
				width:100%
				height:28px
				overflow:hidden
				white-space:nowrap
				text-overflow:ellipsis
				padding-right:24px
				padding-left:38px
				vertical-align:top
			.icon-keyboard_arrow_right
				color:#fff
				position:absolute
				margin-top:9px
				right:12px
				top:0
				font-size:12px
		.background
			position:absolute
			left:0
			right:0
			top:0
			bottom:0
			z-index:-1
			filter:blur(10px)
		.detail
			position:fixed
			width:100%
			height:100%
			top:0
			z-index:100
			overflow:auto
			background-color: rgba(7,17,27,.8)
			transition: all .15s
			backgdrop-filter:blur(10px)
			&::-webkit-scrollbar
				display: none
			&.fade-enter,&.fade-leave-to
				opacity: 0
				background-color: rgba(7,17,27,0)
			.detail-wrap
				padding-top:64px
				min-height:100%
				box-sizing:border-box
				.detail-main
					padding-left:36px
					padding-right:36px
					font-size:12px
					padding-bottom:64px
					.name
						text-align:center
						font-size:16px
						font-weight:700
						color:#fff
						line-height:16px;
					.star-wrap
						margin: 16px 0 28px
						line-height:24px
						text-align:center
					.title
							display:flex
							font-size:0px;
							text-align:center
							line-height:14px
							.text
								font-size:14px
								line-height:14px
								font-weight:700
								display:inline-block
								padding:0 12px
							.line
								flex:1
								margin-top:7px
								border-top:1px solid rgba(255,255,255,.2)
					.body
							margin: 24px 12px 28px
							.body-item
								font-size:0px
								margin-bottom:12px
								&:last-child
									margin-bottom:0
								&>.icon
									display:inline-block
									width:16px
									height:16px
									margin-right:6px
									vertical-align:middle
									&+span
										color:#fff
										display:inline-block
										margin-top:1px
										line-height:12px
										font-weight:200
										font-size:12px
										vertical-align:middle
									&.decrease
										bg-image('./decrease_2')
									&.discount
										bg-image('./discount_2')
									&.guarantee
										bg-image('./guarantee_2')
									&.invoice
										bg-image('./invoice_2')
									&.special
										bg-image('./special_2')
							.bulletin
								line-height:24px
								font-size:12px
								font-weight:200
			.detail-close
				margin-top:-64px
				text-align:center
				.icon-close
					color:rgba(255,255,255,.5)
					font-size:32px
</style>

















