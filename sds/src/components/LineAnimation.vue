<template>
  <div id="movingwaves">
    <svg
      width="600"
      height="150"
    >
      <!--    <g>-->
      <!--      <path transform = "translate(0, 0)" />-->
      <!--    </g>-->

      <!--    <g>-->
      <!--      <path transform = "translate(0, 0)" />-->
      <!--    </g>-->
    </svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import {getData, strokeToFill} from 'gradient-path';

export default {
  name: "LineAnimation",
  data(){
    return{
      line1: [],
      t: 0.5,

      paths1:[],
      t1: []
    }

  },


  mounted(){
    let n = 100;
    let pi_mul = 6.0; //the x range will be this times pi.
    let mul_vals = d3.interpolate(1, 5);
    // console.log(mul_vals)

    this.gen_graph(n, mul_vals(this.t));
    // this.animate_line()
    //
    // setInterval(() =>{
    //   this.animate_line();
    //   console.log('i ran')
    //   }, 1500);


  },

  methods: {

    gen_line(n, pi_mul, sig, mu=0){
       let ans = [];
      for (let i=-n; i<=n; i++){
        let x =  i/ (n*2) *Math.PI*pi_mul;


        let y = Math.exp(-(x*x)/(sig*sig)) * Math.sin(x+mu);
        ans.push({x,y});
      }//for i


      return ans;
    },


    gen_graph(n, pi_mul){
      let width = 600;
      let height = 150;


      let pi = Math.PI;

      this.line1 = this.gen_line(n, pi_mul, 2);

      let x_max = pi_mul*pi/2 -0.5;
      let x = d3.scaleLinear().domain([-x_max, x_max ]).range([0, width]);
      let y = d3.scaleLinear().domain([-1.1, 1.1]).range([height, 0]);


      var line_f = d3.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.y); });


      const line_f2 = d3
          .line()
          .x(d => d.x)
          .y(d => d.y);



      // Add the graph path.
      d3.select("svg")
          .append("g")
          .attr("class", "sds-line-group")
          .append("path")
          .data([this.line1])
          .attr("class", "line")
          .attr("d", line_f);


      //add gradient to path
      // https://medium.com/@cereallarceny/getting-gradients-to-follow-along-svg-paths-in-javascript-45357b60bed7
      let segments = 50, samples=10, precision  = 2, linewidth=1.5;
      let colors = d3.interpolateRainbow;
      // console.log(colors)
      let path = d3.select('svg').select('g').select('path').remove();
      let data = getData({ path, segments, samples, precision });
      let new_path = strokeToFill(data, linewidth, precision);
      new_path = new_path.slice(1,-1)
      // console.log(new_path)

      // this.paths1 = new_path;
      // this.t1 = new_path.map(t => t.progress)


      d3.select('svg')
          .select('g')
          .selectAll('path')
          .data(new_path)
          .enter()
          .append('path')
          .attr('fill', d => colors(d.progress))
          .attr('d', d => line_f2(d.samples));





      //***********line 2********************************************************************************************

      //gen basic line
      let pi_mul2 = pi_mul*4;
      let line2 = this.gen_line(n, pi_mul2, 5, );

      x_max = pi_mul2*pi/2 -5;
      x = d3.scaleLinear().domain([-x_max, x_max ]).range([0, width]);
      y = d3.scaleLinear().domain([-1.1, 1.1]).range([height, 0]);

      // Add the valueline path.
      d3.select("svg")
          .append("g")
          .attr("class", "sds-line-group2")
          .append("path")
          .data([line2])
          .attr("class", "line")
          .attr("d", line_f);

      //replace with gradient
      path = d3.select('svg').select('g:nth-child(2)').select('path').remove();
      data = getData({ path, segments, samples, precision });
      new_path = strokeToFill(data, linewidth, precision);
      new_path = new_path.slice(1,-1)
      // console.log(new_path)


      d3.select('svg')
          .select('g:nth-child(2)')
          .selectAll('path')
          .data(new_path)
          .enter()
          .append('path')
          .attr('fill', d => colors(d.progress))
          .attr('d', d => line_f2(d.samples));




      //***********line 3********************************************************************************************

      //gen basic line
      let pi_mul3 = pi_mul*6;
      let line3 = this.gen_line(100, pi_mul3, 4, 3.14/2);

      x_max = pi_mul3*pi/2-5;
      x = d3.scaleLinear().domain([-x_max, x_max ]).range([0, width]);
      y = d3.scaleLinear().domain([-1.1, 1.1]).range([height, 0]);

      // Add the valueline path.
      d3.select("svg")
          .append("g")
          .attr("class", "sds-line-group3")
          .append("path")
          .data([line3])
          .attr("class", "line")
          .attr("d", line_f);

      //replace with gradient
      path = d3.select('svg').select('g:nth-child(3)').select('path').remove();
      data = getData({ path, segments, samples, precision });
      new_path = strokeToFill(data, linewidth, precision);
      new_path = new_path.slice(1,-1)
      // console.log(new_path)


      d3.select('svg')
          .select('g:nth-child(3)')
          .selectAll('path')
          .data(new_path)
          .enter()
          .append('path')
          .attr('fill', d => colors(d.progress))
          .attr('d', d => line_f2(d.samples));



      //***********line 4********************************************************************************************

      //gen basic line
      let pi_mul4 = pi_mul*2;
      let line4 = this.gen_line(100, pi_mul4, 2, -3.14);

      x_max = pi_mul4*pi/2-5;
      x = d3.scaleLinear().domain([-x_max, x_max ]).range([0, width]);
      y = d3.scaleLinear().domain([-1.1, 1.1]).range([height, 0]);

      // Add the valueline path.
      d3.select("svg")
          .append("g")
          .attr("class", "sds-line-group4")
          .append("path")
          .data([line4])
          .attr("class", "line")
          .attr("d", line_f);

      //replace with gradient
      path = d3.select('svg').select('g:nth-child(4)').select('path').remove();
      data = getData({ path, segments, samples, precision });
      new_path = strokeToFill(data, linewidth, precision);
      new_path = new_path.slice(1,-1)
      // console.log(new_path)


      d3.select('svg')
          .select('g:nth-child(4)')
          .selectAll('path')
          .data(new_path)
          .enter()
          .append('path')
          .attr('fill', d => colors(d.progress))
          .attr('d', d => line_f2(d.samples));


    },




    //don't use JS to animate.  Using CSS animations...much more efficient/higher quality
    animate_line(){

      let colors = d3.interpolateRainbow;

      // this.paths1.push(this.paths1[0]);
      // this.paths1.splice(0,1)

      // this.t1.push(this.t1[0]);
      // this.t1.splice(0,1)

      // this.t1.concat(this.t1.slice(5,))
      // this.t1.splice(0,5)
      //
      // console.log('animate ran', this.t1)


      let t = 1 - Math.random()/3 ;

      const lineFunc = d3
          .line()
          .x(d => d.x)
          .y(d => d.y);

      d3.select('svg')
          .select('g')

          .style('transform-origin', 'center')
          .transition().duration(1000)
          .style('transform', `scale(1, ${t})`);
          // .attr('d', d => lineFunc(d.samples));
    }





  }
}
</script>

<style>
.line {
  fill: none;
  stroke: green;
  stroke-width: 1px;
}

.sds-line-group{
  animation-name: animate_line;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  transform-origin: center center;
}

.sds-line-group2{
  animation-name: animate_line2;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  transform-origin: center center;
}

.sds-line-group3{
  animation-name: animate_line3;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  transform-origin: center center;
}


.sds-line-group4{
  animation-name: animate_line4;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  transform-origin: center center;
}

@keyframes animate_line {
  0%   {transform: scale(1, 1) translateX(-10px);}
  50%  {transform: scale(0.8, 0.5) translateX(10px);}
  100% {transform: scale(1, 1) translateX(-10px);}
}
@keyframes animate_line2 {
  0%   {transform: scale(1, 0.5);}
  50%  {transform: scale(1, 1);}
  100% {transform: scale(1, 0.5);}
}
@keyframes animate_line3 {
  0%   {transform: scale(1, 0.2) translateX(-20px);}
  50%  {transform: scale(1, .7) translateX(20px) ;}
  75%  {transform: scale(1, 1) ;}
  100% {transform: scale(1, 0.2) translateX(-20px);}
}

@keyframes animate_line4 {
  0%   {transform: scale(1, 0.3);}
  20%  {transform: scale(1.2, .5);}
  55%  {transform: scale(1, 1);}
  100% {transform: scale(1, 0.3);}
}
</style>