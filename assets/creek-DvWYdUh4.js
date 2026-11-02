import{A as e,At as t,B as n,Ct as r,Dt as i,F as a,L as o,Mt as s,Pt as ee,R as c,T as l,X as u,Y as d,Z as te,_t as ne,a as re,bt as f,c as ie,d as ae,et as p,f as oe,ft as se,h as ce,i as le,it as ue,jt as de,l as fe,m as pe,n as me,nt as he,o as ge,ot as m,q as _e,s as ve,st as ye,t as be,tt as xe,u as Se,vt as h,w as Ce,yt as we,z as Te}from"./RGBELoader-DMc890p4.js";var g={name:`BokehShader`,defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#include <common>

		varying vec2 vUv;

		uniform sampler2D tColor;
		uniform sampler2D tDepth;

		uniform float maxblur; // max blur amount
		uniform float aperture; // aperture - bigger values for shallower depth of field

		uniform float nearClip;
		uniform float farClip;

		uniform float focus;
		uniform float aspect;

		#include <packing>

		float getDepth( const in vec2 screenPosition ) {
			#if DEPTH_PACKING == 1
			return unpackRGBAToDepth( texture2D( tDepth, screenPosition ) );
			#else
			return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		float getViewZ( const in float depth ) {
			#if PERSPECTIVE_CAMERA == 1
			return perspectiveDepthToViewZ( depth, nearClip, farClip );
			#else
			return orthographicDepthToViewZ( depth, nearClip, farClip );
			#endif
		}


		void main() {

			vec2 aspectcorrect = vec2( 1.0, aspect );

			float viewZ = getViewZ( getDepth( vUv ) );

			float factor = ( focus + viewZ ); // viewZ is <= 0, so this is a difference equation

			vec2 dofblur = vec2 ( clamp( factor * aperture, -maxblur, maxblur ) );

			vec2 dofblur9 = dofblur * 0.9;
			vec2 dofblur7 = dofblur * 0.7;
			vec2 dofblur4 = dofblur * 0.4;

			vec4 col = vec4( 0.0 );

			col += texture2D( tColor, vUv.xy );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15, -0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.15,  0.37 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.37,  0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.37, -0.15 ) * aspectcorrect ) * dofblur9 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.15, -0.37 ) * aspectcorrect ) * dofblur9 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.40,  0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur7 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur7 );

			col += texture2D( tColor, vUv.xy + ( vec2(  0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,  -0.4  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29,  0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.4,   0.0  ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2( -0.29, -0.29 ) * aspectcorrect ) * dofblur4 );
			col += texture2D( tColor, vUv.xy + ( vec2(  0.0,   0.4  ) * aspectcorrect ) * dofblur4 );

			gl_FragColor = col / 41.0;
			gl_FragColor.a = 1.0;

		}`},Ee=class extends ae{constructor(e,n,r){super(),this.scene=e,this.camera=n;let i=r.focus===void 0?1:r.focus,a=r.aperture===void 0?.025:r.aperture,s=r.maxblur===void 0?1:r.maxblur;this._renderTargetDepth=new ee(1,1,{minFilter:xe,magFilter:xe,type:o}),this._renderTargetDepth.texture.name=`BokehPass.depth`,this._materialDepth=new te,this._materialDepth.depthPacking=se,this._materialDepth.blending=0;let c=t.clone(g.uniforms);c.tDepth.value=this._renderTargetDepth.texture,c.focus.value=i,c.aspect.value=n.aspect,c.aperture.value=a,c.maxblur.value=s,c.nearClip.value=n.near,c.farClip.value=n.far,this.materialBokeh=new f({defines:Object.assign({},g.defines),uniforms:c,vertexShader:g.vertexShader,fragmentShader:g.fragmentShader}),this.uniforms=c,this._fsQuad=new Se(this.materialBokeh),this._oldClearColor=new l}render(e,t,n){this.scene.overrideMaterial=this._materialDepth,e.getClearColor(this._oldClearColor);let r=e.getClearAlpha(),i=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this._renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=n.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this._fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(r),e.autoClear=i}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this._renderTargetDepth.setSize(e,t)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}},_=document.querySelector(`#creek`),v=matchMedia(`(pointer: coarse)`).matches||innerWidth<760,y=new pe({canvas:_,antialias:!0,powerPreference:`high-performance`});y.setPixelRatio(Math.min(devicePixelRatio||1,v?1.5:1.75)),y.setSize(innerWidth,innerHeight),y.toneMapping=4,y.toneMappingExposure=1.3,y.outputColorSpace=h,y.shadowMap.enabled=!0,y.shadowMap.type=1;var b=new we,De=new oe(y);new be().load(new URL(`images/creek/forest.hdr`,document.baseURI).href,e=>{e.mapping=303,b.environment=De.fromEquirectangular(e).texture,b.environmentIntensity=.85,e.dispose()}),b.background=new l(12574954),b.fog=new a(13624540,.0055);var x=new ue(55,innerWidth/innerHeight,.08,240),S=e=>2.4*Math.sin(e*.075)+.9*Math.sin(e*.21)+.35*Math.sin(e*.53),Oe=27;x.position.set(S(Oe),1.45,Oe);var C=0,w=-.025,T={top:{value:new l(5214152)},horizon:{value:new l(15266013)},sunDir:{value:new s(-.36,.55,-.75).normalize()},sunColor:{value:new l(16774102)}},E=new d(new r(160,32,20),new f({side:1,depthWrite:!1,fog:!1,uniforms:T,vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`varying vec3 vDir; uniform vec3 top, horizon, sunColor, sunDir;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float vnoise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
        return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
      float fbm(vec2 p){ float v=0.0, a=.5; for(int i=0;i<4;i++){ v+=a*vnoise(p); p*=2.03; a*=.5; } return v; }
      void main(){
        float h = clamp(vDir.y * 1.15 + 0.08, 0.0, 1.0);
        vec3 c = mix(horizon, top, pow(h, 0.65));
        vec2 sp = vDir.xz / (abs(vDir.y) + 0.28);
        float cl = fbm(sp * 2.1 + vec2(3.1, 1.7));
        float cloud = smoothstep(.46, .66, cl) * smoothstep(.01, .26, vDir.y);
        c = mix(c, vec3(1.0, .985, .95), cloud * .65);
        float sun = pow(max(dot(vDir, normalize(sunDir)), 0.0), 220.0);
        c += sunColor * sun * 1.6;
        float glow = pow(max(dot(vDir, normalize(sunDir)), 0.0), 8.0);
        c += sunColor * glow * .10;
        gl_FragColor = vec4(c, 1.0);
      }`}));E.frustumCulled=!1,b.add(E);var ke=new c(14479359,4872756,1.55);b.add(ke);var D=new e(16773074,4);D.position.set(12,30,16),D.castShadow=!0,D.shadow.mapSize.set(2048,2048),D.shadow.camera.left=-45,D.shadow.camera.right=45,D.shadow.camera.top=65,D.shadow.camera.bottom=-65,D.shadow.camera.near=1,D.shadow.camera.far=140,D.shadow.bias=-7e-4,b.add(D);var Ae=new e(13625599,.9);Ae.position.set(18,14,28),b.add(Ae),b.add(new ce(16777215,.28));var O={resolution:{value:new de(innerWidth,innerHeight)},time:{value:0},sunDir:{value:new s(-.36,.55,-.75).normalize()},sunColor:{value:new l(16773328)},topColor:{value:new l(7317976)},horizonColor:{value:new l(14281431)},shallow:{value:new l(3843994)},deep:{value:new l(941918)}},je=new f({uniforms:O,transparent:!0,depthWrite:!1,side:2,vertexShader:`varying vec3 vWorld; varying vec2 vUv;
    void main(){ vUv=uv; vec4 wp=modelMatrix*vec4(position,1.0); vWorld=wp.xyz; gl_Position=projectionMatrix*viewMatrix*wp; }`,fragmentShader:`varying vec3 vWorld; varying vec2 vUv;
    uniform sampler2D tRefract; uniform vec2 resolution; uniform float time;
    uniform vec3 sunDir, sunColor, topColor, horizonColor, shallow, deep;
    float cx(float z){ return 2.4*sin(z*.075)+.9*sin(z*.21)+.35*sin(z*.53); }
    void main(){
      vec2 uv = gl_FragCoord.xy / resolution;
      vec2 p = vWorld.xz;
      float w1 = sin(p.x*2.1+time*1.2)+sin(p.y*2.7-time*1.5);
      float w2 = sin(p.x*3.7-time*.8)+sin(p.y*1.9+time*1.1);
      vec3 n = normalize(vec3(w1*.045, 1.0, w2*.045));
      vec3 V = normalize(cameraPosition - vWorld);
      vec3 R = reflect(-V, n);
      vec3 sky = mix(horizonColor, topColor, clamp(R.y*.9+.12, 0.0, 1.0));
      float fres = pow(1.0 - max(dot(n, V), 0.0), 3.0);
      vec2 off = n.xz * .034;
      vec3 refr = mix(shallow, deep, clamp(length(p - vec2(cx(p.y), p.y)) * .18, 0.0, 1.0));
      float dl = length(p - vec2(cx(p.y), p.y));
      float body = smoothstep(0.0, 4.0, dl);
      vec3 col = mix(refr * vec3(.88, 1.0, .96), mix(shallow, deep, body*.55), .07);
      col = mix(col, sky, fres*.30);
      float lum = dot(col, vec3(.2126,.7152,.0722));
      col = mix(vec3(lum), col, 1.22);
      float spec = pow(max(dot(reflect(-sunDir, n), V), 0.0), 180.0);
      col += sunColor * spec * 1.4;
      float shore = smoothstep(3.35, 4.25, dl);
      float foam = shore * (.18 + .34 * sin(p.x*7.0 + p.y*5.0 + time*2.2));
      col = mix(col, vec3(.94, 1.0, .96), clamp(foam, 0.0, 1.0) * .55);
      gl_FragColor = vec4(col, .62);
    }`}),k=new d(new m(70,132,1,1),je);k.rotation.x=-Math.PI/2,k.position.set(0,0,0),k.frustumCulled=!1,b.add(k);var A=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},j=(e,t,n=1)=>(Math.sin(e*n*2.1+t*n*1.3)+Math.sin(e*n*.7-t*n*1.7))*.5;function M(e,t){let n=Math.abs(e-S(t)),r=-.62*Math.exp(-((n/3)**2)),i=A(3.6,15,n)*(2.1+1.15*j(e,t,.06)),a=A(16,30,n)*(3.2+2*j(e,t,.035)),o=.16*j(e,t,.32)*A(2.8,5.5,n);return .06+r+i+a+o}var Me=new Te(1,1),Ne=new p({roughness:.95,metalness:0}),N=new n(Me,Ne,1e3);N.receiveShadow=!0;var P=new he,F=new l;for(let e=0;e<1e3;e++){let t=-56+Math.random()*112,n=Math.random()**.7*3.7,r=S(t)+(Math.random()<.5?-n:n),i=.035+Math.random()**2*.14;P.position.set(r,M(r,t)-i*.15,t),P.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3),P.scale.set(i*(.8+Math.random()*.7),i*.55,i*(.8+Math.random()*.7)),P.updateMatrix(),N.setMatrixAt(e,P.matrix),N.setColorAt(e,F.setHSL(.09+Math.random()*.05,.1+Math.random()*.1,.38+Math.random()*.22))}N.instanceColor.needsUpdate=!0,b.add(N);var I=new i().load(new URL(`images/creek/grass.png`,document.baseURI).href);I.colorSpace=h,I.anisotropy=4;var Pe=new m(.58,.66);Pe.translate(0,.33,0);var L=new p({map:I,alphaTest:.38,side:2,roughness:1,metalness:0});L.onBeforeCompile=e=>{e.uniforms.uTime={value:0},L.userData.shader=e,e.vertexShader=`uniform float uTime;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
    float ph = instanceMatrix[3].x * .55 + instanceMatrix[3].z * .37;
    float sway = sin(uTime * 1.7 + ph) * .06 * pow(clamp(position.y / .66, 0.0, 1.0), 1.6);
    transformed.x += sway; transformed.z += sway * .55;`)};var R=v?4e3:9e3,z=new n(Pe,L,R);z.receiveShadow=!0;var B=0;for(let e=0;e<R*2&&B<R;e++){let e=-58+Math.random()*116,t=Math.random()<.5?-1:1,n=3.5+Math.random()**.8*11,r=S(e)+t*n,i=M(r,e);if(i<.08)continue;P.position.set(r,i,e),P.rotation.set(0,Math.random()*6.28,0);let a=.5+Math.random()*.5;P.scale.set(a,a,a),P.updateMatrix(),z.setMatrixAt(B,P.matrix),z.setColorAt(B,F.setHSL(.25+Math.random()*.05,.2+Math.random()*.12,.37+Math.random()*.14)),B++}z.count=B,z.instanceColor.needsUpdate=!0,b.add(z);var Fe=new i().load(new URL(`images/creek/leaf.png`,document.baseURI).href);Fe.colorSpace=h;var Ie=new m(1.9,1.9),Le=new p({map:Fe,alphaTest:.42,side:2,roughness:.9,metalness:0}),Re=[];fetch(new URL(`models/creek_trees.json`,document.baseURI).href).then(e=>e.json()).then(e=>{let t=e.length*34,r=new n(Ie,Le,t),i=0;for(let t of e){let e=M(t.x,t.z);for(let n=0;n<34;n++){let n=Math.random()*Math.PI*2,a=1+Math.random()*3.4;P.position.set(t.x+Math.cos(n)*a,e+t.h*(.72+Math.random()*.3),t.z+Math.sin(n)*a),P.rotation.set(Math.random()*3.14,Math.random()*6.28,Math.random()*3.14);let o=1.1+Math.random()*1.6;P.scale.set(o,o,o),P.updateMatrix(),r.setMatrixAt(i,P.matrix),r.setColorAt(i,F.setHSL(.25+Math.random()*.06,.32+Math.random()*.2,.28+Math.random()*.2)),i++}}r.count=i,r.instanceColor.needsUpdate=!0,r.frustumCulled=!1,b.add(r),Re.push(r)}).catch(()=>{});var ze=new i().load(new URL(`images/creek/flower.png`,document.baseURI).href);ze.colorSpace=h;var Be=new m(.28,.28);Be.translate(0,.14,0);var Ve=new u({map:ze,alphaTest:.25,side:2,transparent:!0}),V=new n(Be,Ve,1600),H=0;for(let e=0;e<3600&&H<1600;e++){let e=-56+Math.random()*112,t=Math.random()<.5?-1:1,n=4+Math.random()*9,r=S(e)+t*n,i=M(r,e);if(i<.1)continue;P.position.set(r,i+.02,e),P.rotation.set(0,Math.random()*6.28,0);let a=.7+Math.random()*.7;P.scale.set(a,a,a),P.updateMatrix(),V.setMatrixAt(H,P.matrix),V.setColorAt(H,F.setHSL(Math.random()<.5?.12:.92,.25,.82)),H++}V.count=H,V.instanceColor.needsUpdate=!0,b.add(V);var He=new u({color:15400948,transparent:!0,opacity:.03,blending:2,depthWrite:!1,side:2}),Ue=[];fetch(new URL(`models/creek_rocks.json`,document.baseURI).href).then(e=>e.json()).then(e=>{for(let t of e){let e=new d(new ne(.75,1,28),He);e.rotation.x=-Math.PI/2,e.position.set(t.x,.025,t.z),e.scale.setScalar(t.s*.45+.1),e.renderOrder=3,b.add(e),Ue.push(e)}}).catch(()=>{});var We=new f({transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`varying vec2 vUv; uniform float uTime;
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
    void main(){
      vec2 g = floor(vUv * vec2(520.0, 980.0));
      float n = h(g + floor(uTime*4.0));
      float s = smoothstep(.992, 1.0, n);
      gl_FragColor = vec4(vec3(1.0,.96,.82), s*.42);
    }`}),U=new d(new m(70,132),We);U.rotation.x=-Math.PI/2,U.position.y=.03,U.renderOrder=4,b.add(U);var W=new ye(16757596,0,26,2);W.position.set(S(-32)+7,4.2,-32),b.add(W);var G=[];for(let e=0;e<60;e++){let e=new d(new r(.025,6,4),new u({color:16767370,transparent:!0,opacity:0}));e.position.set(S(-20+Math.random()*50)+(Math.random()-.5)*10,.5+Math.random()*2.6,-20+Math.random()*55),b.add(e),G.push(e)}var K=new ie(y);K.setPixelRatio(y.getPixelRatio()),K.setSize(innerWidth,innerHeight),K.addPass(new ve(b,x));var q=new Ee(b,x,{focus:11,aperture:12e-5,maxblur:.008});q.enabled=!1,K.addPass(q);var Ge=new ge(new de(innerWidth,innerHeight),.13,.45,.95);K.addPass(Ge),K.addPass(new re);var Ke=new fe({uniforms:{tDiffuse:{value:null},contrast:{value:1.07},saturation:{value:1.16},warm:{value:.045},vignette:{value:.26}},vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`varying vec2 vUv; uniform sampler2D tDiffuse; uniform float contrast, saturation, warm, vignette;
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      c = (c - .5) * contrast + .5;
      float l = dot(c, vec3(.2126,.7152,.0722));
      c = mix(vec3(l), c, saturation);
      c += warm * vec3(.10, .035, -.015);
      float v = smoothstep(.18, .82, length(vUv - .5));
      c *= 1.0 - vignette * v;
      gl_FragColor = vec4(c, 1.0);
    }`});K.addPass(Ke);var qe=new le(innerWidth,innerHeight);K.addPass(qe);var Je=new me,J=null;Je.load(new URL(`models/creek_env.glb`,document.baseURI).href,e=>{J=e.scene,J.traverse(e=>{if(!e.isMesh)return;e.castShadow=!0,e.receiveShadow=!0;let t=Array.isArray(e.material)?e.material:[e.material];for(let e of t)e.vertexColors=!0,e.roughness=.9,e.metalness=0,e.envMapIntensity=.9,e.emissiveIntensity!==void 0&&(e.emissiveIntensity=2.2),e.needsUpdate=!0}),b.add(J),document.querySelector(`#loading`).classList.add(`hidden`)},void 0,e=>{console.error(`creek env`,e),document.querySelector(`#loading`).textContent=`溪境加载失败`});var Ye={afternoon:{top:7317976,horizon:14281431,sun:16773074,sunI:3.1,hemi:1.15,fog:13624540,fogD:.009,exp:1.08,water:5224621,night:0},golden:{top:8360900,horizon:16173452,sun:16757854,sunI:3.6,hemi:.85,fog:15190950,fogD:.01,exp:1.02,water:5941150,night:0},blue:{top:2374758,horizon:8164536,sun:10336480,sunI:1.7,hemi:.62,fog:7834792,fogD:.012,exp:.9,water:2977660,night:.15},night:{top:727088,horizon:2968152,sun:11127016,sunI:.65,hemi:.35,fog:1781815,fogD:.016,exp:.8,water:1522758,night:1}},Xe=`afternoon`;function Y(e){let t=Ye[e]||Ye.afternoon;Xe=e,T.top.value.set(t.top),T.horizon.value.set(t.horizon),T.sunColor.value.set(t.sun),D.color.set(t.sun),D.intensity=t.sunI,ke.intensity=t.hemi,b.fog.color.set(t.fog),b.fog.density=t.fogD,y.toneMappingExposure=t.exp,O.shallow.value.set(t.water),O.topColor.value.set(t.top),O.horizonColor.value.set(t.horizon),O.sunColor.value.set(t.sun),O.sunDir.value.copy(D.position).normalize(),W.intensity=t.night*18,q.uniforms?.focus&&(q.uniforms.focus.value=11);for(let e of G)e.material.opacity=t.night*.85,e.visible=t.night>.1;document.querySelectorAll(`.time`).forEach(t=>t.classList.toggle(`on`,t.dataset.time===e))}Y(`afternoon`),document.querySelectorAll(`.time`).forEach(e=>e.addEventListener(`click`,()=>Y(e.dataset.time))),document.querySelector(`#dof`).addEventListener(`click`,e=>{q.enabled=!q.enabled,e.currentTarget.setAttribute(`aria-pressed`,String(q.enabled))});var X=!1,Z={x:0,y:0},Q=0,Ze=0;_.addEventListener(`pointerdown`,e=>{X=!0,Z={x:e.clientX,y:e.clientY},_.setPointerCapture(e.pointerId)}),addEventListener(`pointerup`,()=>{X=!1}),addEventListener(`pointermove`,e=>{X&&(C-=(e.clientX-Z.x)*.0042,w=_e.clamp(w-(e.clientY-Z.y)*.0032,-.8,.5),Z={x:e.clientX,y:e.clientY})}),addEventListener(`wheel`,e=>{Q+=e.deltaY*6e-4},{passive:!0});var $=new Set;addEventListener(`keydown`,e=>{[`KeyW`,`KeyA`,`KeyS`,`KeyD`,`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`].includes(e.code)&&($.add(e.code),e.preventDefault())}),addEventListener(`keyup`,e=>$.delete(e.code));function Qe(e){let t=($.has(`KeyW`)||$.has(`ArrowUp`)?1:0)-($.has(`KeyS`)||$.has(`ArrowDown`)?1:0),n=($.has(`KeyD`)||$.has(`ArrowRight`)?1:0)-($.has(`KeyA`)||$.has(`ArrowLeft`)?1:0),r=v?3:4.2;(t||n)&&(x.position.x+=(-Math.sin(C)*t+Math.cos(C)*n)*r*e,x.position.z+=(-Math.cos(C)*t-Math.sin(C)*n)*r*e),x.position.z+=Q*8,Q*=.9,x.position.z=_e.clamp(x.position.z,-56,54),x.position.x=_e.clamp(x.position.x,S(x.position.z)-9,S(x.position.z)+9),Ze+=e*(t||n?6.5:1.2),x.position.y=1.45+Math.sin(Ze)*.014,x.rotation.set(0,0,0),x.rotateY(C),x.rotateX(w)}var $e=new Ce,et=!0;function tt(){if(!et)return;let e=Math.min($e.getDelta(),.05);Qe(e),O.time.value+=e,E.position.copy(x.position);for(let e=0;e<G.length;e++){let t=G[e];t.position.y+=Math.sin(performance.now()*7e-4+e)*8e-4,t.visible&&(t.material.opacity=.35+.35*Math.sin(performance.now()*.0015+e*2))}J&&(J.position.y=0),L.userData.shader&&(L.userData.shader.uniforms.uTime.value+=e),We.uniforms.uTime.value+=e,He.opacity=.15+.07*Math.sin(performance.now()*.0012),K.render(),requestAnimationFrame(tt)}tt();function nt(){let e=innerWidth,t=innerHeight;y.setSize(e,t),K.setSize(e,t),x.aspect=e/t,x.updateProjectionMatrix(),Ge.setSize(e,t),qe.setSize(e,t),O.resolution.value.set(e,t)}addEventListener(`resize`,nt),window.__creek={scene:b,camera:x,renderer:y,composer:K,setTime:Y,get time(){return Xe},bokeh:q,water:k,env:()=>J,pause:()=>{et=!1}};