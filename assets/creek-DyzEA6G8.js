import{A as e,At as t,B as n,Ct as r,Dt as i,F as a,L as o,Mt as s,Pt as ee,R as c,T as l,X as u,Y as d,Z as te,_t as ne,a as re,bt as f,c as ie,d as ae,et as p,f as oe,ft as se,g as ce,h as le,i as ue,it as de,jt as fe,l as pe,m as me,mt as he,n as ge,nt as _e,o as ve,ot as m,q as h,s as ye,st as be,t as xe,tt as Se,u as Ce,vt as g,w as we,yt as Te,z as Ee}from"./RGBELoader-DMc890p4.js";var _={name:`BokehShader`,defines:{DEPTH_PACKING:1,PERSPECTIVE_CAMERA:1},uniforms:{tColor:{value:null},tDepth:{value:null},focus:{value:1},aspect:{value:1},aperture:{value:.025},maxblur:{value:.01},nearClip:{value:1},farClip:{value:1e3}},vertexShader:`

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

		}`},De=class extends ae{constructor(e,n,r){super(),this.scene=e,this.camera=n;let i=r.focus===void 0?1:r.focus,a=r.aperture===void 0?.025:r.aperture,s=r.maxblur===void 0?1:r.maxblur;this._renderTargetDepth=new ee(1,1,{minFilter:Se,magFilter:Se,type:o}),this._renderTargetDepth.texture.name=`BokehPass.depth`,this._materialDepth=new te,this._materialDepth.depthPacking=se,this._materialDepth.blending=0;let c=t.clone(_.uniforms);c.tDepth.value=this._renderTargetDepth.texture,c.focus.value=i,c.aspect.value=n.aspect,c.aperture.value=a,c.maxblur.value=s,c.nearClip.value=n.near,c.farClip.value=n.far,this.materialBokeh=new f({defines:Object.assign({},_.defines),uniforms:c,vertexShader:_.vertexShader,fragmentShader:_.fragmentShader}),this.uniforms=c,this._fsQuad=new Ce(this.materialBokeh),this._oldClearColor=new l}render(e,t,n){this.scene.overrideMaterial=this._materialDepth,e.getClearColor(this._oldClearColor);let r=e.getClearAlpha(),i=e.autoClear;e.autoClear=!1,e.setClearColor(16777215),e.setClearAlpha(1),e.setRenderTarget(this._renderTargetDepth),e.clear(),e.render(this.scene,this.camera),this.uniforms.tColor.value=n.texture,this.uniforms.nearClip.value=this.camera.near,this.uniforms.farClip.value=this.camera.far,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),e.clear(),this._fsQuad.render(e)),this.scene.overrideMaterial=null,e.setClearColor(this._oldClearColor),e.setClearAlpha(r),e.autoClear=i}setSize(e,t){this.materialBokeh.uniforms.aspect.value=e/t,this._renderTargetDepth.setSize(e,t)}dispose(){this._renderTargetDepth.dispose(),this._materialDepth.dispose(),this.materialBokeh.dispose(),this._fsQuad.dispose()}},v=document.querySelector(`#creek`),y=matchMedia(`(pointer: coarse)`).matches||innerWidth<760,b=new me({canvas:v,antialias:!0,powerPreference:`high-performance`});b.setPixelRatio(Math.min(devicePixelRatio||1,y?1.5:1.75)),b.setSize(innerWidth,innerHeight),b.toneMapping=4,b.toneMappingExposure=1.3,b.outputColorSpace=g,b.shadowMap.enabled=!0,b.shadowMap.type=1;var x=new Te,Oe=new oe(b);new xe().load(new URL(`images/creek/forest.hdr`,document.baseURI).href,e=>{e.mapping=303,x.environment=Oe.fromEquirectangular(e).texture,x.environmentIntensity=.85,e.dispose()}),x.background=new l(12574954),x.fog=new a(13624540,.0055);var S=new de(55,innerWidth/innerHeight,.08,240),C=e=>2.4*Math.sin(e*.075)+.9*Math.sin(e*.21)+.35*Math.sin(e*.53),ke=27;S.position.set(C(ke),1.45,ke);var w=0,T=-.025,E={top:{value:new l(5214152)},horizon:{value:new l(15266013)},sunDir:{value:new s(-.36,.55,-.75).normalize()},sunColor:{value:new l(16774102)}},D=new d(new r(160,32,20),new f({side:1,depthWrite:!1,fog:!1,uniforms:E,vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`varying vec3 vDir; uniform vec3 top, horizon, sunColor, sunDir;
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
      }`}));D.frustumCulled=!1,x.add(D);var Ae=new c(14479359,4872756,1.55);x.add(Ae);var O=new e(16773074,4);O.position.set(12,30,16),O.castShadow=!0,O.shadow.mapSize.set(2048,2048),O.shadow.camera.left=-45,O.shadow.camera.right=45,O.shadow.camera.top=65,O.shadow.camera.bottom=-65,O.shadow.camera.near=1,O.shadow.camera.far=140,O.shadow.bias=-7e-4,x.add(O);var je=new e(13625599,.9);je.position.set(18,14,28),x.add(je),x.add(new le(16777215,.28));var k={resolution:{value:new fe(innerWidth,innerHeight)},time:{value:0},sunDir:{value:new s(-.36,.55,-.75).normalize()},sunColor:{value:new l(16773328)},topColor:{value:new l(7317976)},horizonColor:{value:new l(14281431)},shallow:{value:new l(3843994)},deep:{value:new l(941918)}},Me=new f({uniforms:k,transparent:!0,depthWrite:!1,side:2,vertexShader:`varying vec3 vWorld; varying vec2 vUv;
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
    }`}),A=new d(new m(70,132,1,1),Me);A.rotation.x=-Math.PI/2,A.position.set(0,0,0),A.frustumCulled=!1,x.add(A);var j=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},M=(e,t,n=1)=>(Math.sin(e*n*2.1+t*n*1.3)+Math.sin(e*n*.7-t*n*1.7))*.5;function N(e,t){let n=Math.abs(e-C(t)),r=-.62*Math.exp(-((n/3)**2)),i=j(3.6,15,n)*(2.1+1.15*M(e,t,.06)),a=j(16,30,n)*(3.2+2*M(e,t,.035)),o=.16*M(e,t,.32)*j(2.8,5.5,n);return .06+r+i+a+o}var Ne=new Ee(1,1),Pe=new p({roughness:.95,metalness:0}),P=new n(Ne,Pe,1e3);P.receiveShadow=!0;var F=new _e,I=new l;for(let e=0;e<1e3;e++){let t=-56+Math.random()*112,n=Math.random()**.7*3.7,r=C(t)+(Math.random()<.5?-n:n),i=.035+Math.random()**2*.14;F.position.set(r,N(r,t)-i*.15,t),F.rotation.set(Math.random()*3,Math.random()*3,Math.random()*3),F.scale.set(i*(.8+Math.random()*.7),i*.55,i*(.8+Math.random()*.7)),F.updateMatrix(),P.setMatrixAt(e,F.matrix),P.setColorAt(e,I.setHSL(.09+Math.random()*.05,.1+Math.random()*.1,.38+Math.random()*.22))}P.instanceColor.needsUpdate=!0,x.add(P);var L=new i().load(new URL(`images/creek/grass.png`,document.baseURI).href);L.colorSpace=g,L.anisotropy=4;var Fe=new m(.58,.66);Fe.translate(0,.33,0);var R=new p({map:L,alphaTest:.38,side:2,roughness:1,metalness:0});R.onBeforeCompile=e=>{e.uniforms.uTime={value:0},R.userData.shader=e,e.vertexShader=`uniform float uTime;
`+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
    float ph = instanceMatrix[3].x * .55 + instanceMatrix[3].z * .37;
    float sway = sin(uTime * 1.7 + ph) * .06 * pow(clamp(position.y / .66, 0.0, 1.0), 1.6);
    transformed.x += sway; transformed.z += sway * .55;`)};var z=y?4e3:9e3,B=new n(Fe,R,z);B.receiveShadow=!0;var V=0;for(let e=0;e<z*2&&V<z;e++){let e=-58+Math.random()*116,t=Math.random()<.5?-1:1,n=3.5+Math.random()**.8*11,r=C(e)+t*n,i=N(r,e);if(i<.08)continue;F.position.set(r,i,e),F.rotation.set(0,Math.random()*6.28,0);let a=.5+Math.random()*.5;F.scale.set(a,a,a),F.updateMatrix(),B.setMatrixAt(V,F.matrix),B.setColorAt(V,I.setHSL(.25+Math.random()*.05,.2+Math.random()*.12,.37+Math.random()*.14)),V++}B.count=V,B.instanceColor.needsUpdate=!0,x.add(B);var Ie=new i().load(new URL(`images/creek/leaf.png`,document.baseURI).href);Ie.colorSpace=g;var Le=new m(1.9,1.9),Re=new p({map:Ie,alphaTest:.42,side:2,roughness:.9,metalness:0}),ze=[];fetch(new URL(`models/creek_trees.json`,document.baseURI).href).then(e=>e.json()).then(e=>{let t=e.length*34,r=new n(Le,Re,t),i=0;for(let t of e){let e=N(t.x,t.z);for(let n=0;n<34;n++){let n=Math.random()*Math.PI*2,a=1+Math.random()*3.4;F.position.set(t.x+Math.cos(n)*a,e+t.h*(.72+Math.random()*.3),t.z+Math.sin(n)*a),F.rotation.set(Math.random()*3.14,Math.random()*6.28,Math.random()*3.14);let o=1.1+Math.random()*1.6;F.scale.set(o,o,o),F.updateMatrix(),r.setMatrixAt(i,F.matrix),r.setColorAt(i,I.setHSL(.25+Math.random()*.06,.32+Math.random()*.2,.28+Math.random()*.2)),i++}}r.count=i,r.instanceColor.needsUpdate=!0,r.frustumCulled=!1,x.add(r),ze.push(r)}).catch(()=>{});var Be=new i().load(new URL(`images/creek/flower.png`,document.baseURI).href);Be.colorSpace=g;var Ve=new m(.28,.28);Ve.translate(0,.14,0);var He=new u({map:Be,alphaTest:.25,side:2,transparent:!0}),H=new n(Ve,He,1600),U=0;for(let e=0;e<3600&&U<1600;e++){let e=-56+Math.random()*112,t=Math.random()<.5?-1:1,n=4+Math.random()*9,r=C(e)+t*n,i=N(r,e);if(i<.1)continue;F.position.set(r,i+.02,e),F.rotation.set(0,Math.random()*6.28,0);let a=.7+Math.random()*.7;F.scale.set(a,a,a),F.updateMatrix(),H.setMatrixAt(U,F.matrix),H.setColorAt(U,I.setHSL(Math.random()<.5?.12:.92,.25,.82)),U++}H.count=U,H.instanceColor.needsUpdate=!0,x.add(H);var W=new u({color:15400948,transparent:!0,opacity:.03,blending:2,depthWrite:!1,side:2}),Ue=[];fetch(new URL(`models/creek_rocks.json`,document.baseURI).href).then(e=>e.json()).then(e=>{for(let t of e){let e=new d(new ne(.75,1,28),W);e.rotation.x=-Math.PI/2,e.position.set(t.x,.025,t.z),e.scale.setScalar(t.s*.45+.1),e.renderOrder=3,x.add(e),Ue.push(e)}}).catch(()=>{});var We=new he,Ge=new s(0,-1,0);function Ke(e,t){if(X){We.set(new s(e,25,t),Ge);let n=We.intersectObject(X,!0)[0];if(n)return n.point.y}return N(e,t)}var qe=new ge;function G(e,t){qe.load(new URL(e,document.baseURI).href,e=>{let n=e.scene,r=new ce().setFromObject(n),i=Math.max(.01,r.max.y-r.min.y);for(let e=0;e<t;e++){let e=-54+Math.random()*108,t=2.2+Math.random()*7,r=C(e)+(Math.random()<.5?-t:t),a=.3+Math.random()*.72,o=a/i,s=n.clone(!0);if(s.scale.set(o*(.9+Math.random()*.3),o,o*(.9+Math.random()*.3)),s.rotation.y=Math.random()*Math.PI*2,s.position.set(r,Ke(r,e)+a*.1,e),s.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0,e.material.envMapIntensity=.85)}),x.add(s),t<4.1){let t=new d(new ne(.75,1,24),W);t.rotation.x=-Math.PI/2,t.position.set(r,.03,e),t.scale.setScalar(a*.95+.15),t.renderOrder=3,x.add(t),Ue.push(t)}}},void 0,t=>console.warn(`hero rock`,e,t))}G(`models/ph/moon_rock_01/moon_rock_01.gltf`,22),G(`models/ph/moon_rock_02/moon_rock_02.gltf`,20),G(`models/ph/moon_rock_03/moon_rock_03.gltf`,18);function Je(e,t,n,r,i,a){qe.load(new URL(e,document.baseURI).href,e=>{let o=e.scene,s=new ce().setFromObject(o),ee=Math.max(.01,s.max.y-s.min.y);for(let e=0;e<t;e++){let e=-56+Math.random()*112,t=Math.random()<.5?-1:1,s=i+Math.random()*(a-i),c=C(e)+t*s;if(N(c,e)<.1)continue;let l=(n+Math.random()*(r-n))/ee,u=o.clone(!0);u.scale.set(l,l,l),u.rotation.y=Math.random()*Math.PI*2,u.position.set(c,Ke(c,e),e),u.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0,e.material.envMapIntensity=.9)}),x.add(u)}},void 0,t=>console.warn(`hero plant`,e,t))}Je(`models/ph/grass_medium_01/grass_medium_01.gltf`,150,.35,.8,6,11),Je(`models/ph/fern_02/fern_02.gltf`,80,.35,.8,6,9);var Ye=new f({transparent:!0,depthWrite:!1,blending:2,uniforms:{uTime:{value:0}},vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`varying vec2 vUv; uniform float uTime;
    float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
    void main(){
      vec2 g = floor(vUv * vec2(520.0, 980.0));
      float n = h(g + floor(uTime*4.0));
      float s = smoothstep(.992, 1.0, n);
      gl_FragColor = vec4(vec3(1.0,.96,.82), s*.42);
    }`}),K=new d(new m(70,132),Ye);K.rotation.x=-Math.PI/2,K.position.y=.03,K.renderOrder=4,x.add(K);var Xe=new be(16757596,0,26,2);Xe.position.set(C(-32)+7,4.2,-32),x.add(Xe);var q=[];for(let e=0;e<60;e++){let e=new d(new r(.025,6,4),new u({color:16767370,transparent:!0,opacity:0}));e.position.set(C(-20+Math.random()*50)+(Math.random()-.5)*10,.5+Math.random()*2.6,-20+Math.random()*55),x.add(e),q.push(e)}var J=new ie(b);J.setPixelRatio(b.getPixelRatio()),J.setSize(innerWidth,innerHeight),J.addPass(new ye(x,S));var Y=new De(x,S,{focus:11,aperture:12e-5,maxblur:.008});Y.enabled=!1,J.addPass(Y);var Ze=new ve(new fe(innerWidth,innerHeight),.13,.45,.95);J.addPass(Ze),J.addPass(new re);var Qe=new pe({uniforms:{tDiffuse:{value:null},contrast:{value:1.07},saturation:{value:1.16},warm:{value:.045},vignette:{value:.26}},vertexShader:`varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,fragmentShader:`varying vec2 vUv; uniform sampler2D tDiffuse; uniform float contrast, saturation, warm, vignette;
    void main(){
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      c = (c - .5) * contrast + .5;
      float l = dot(c, vec3(.2126,.7152,.0722));
      c = mix(vec3(l), c, saturation);
      c += warm * vec3(.10, .035, -.015);
      float v = smoothstep(.18, .82, length(vUv - .5));
      c *= 1.0 - vignette * v;
      gl_FragColor = vec4(c, 1.0);
    }`});J.addPass(Qe);var $e=new ue(innerWidth,innerHeight);J.addPass($e);var et=new ge,X=null;et.load(new URL(`models/creek_env.glb`,document.baseURI).href,e=>{X=e.scene,X.traverse(e=>{if(!e.isMesh)return;e.castShadow=!0,e.receiveShadow=!0;let t=Array.isArray(e.material)?e.material:[e.material];for(let e of t)e.vertexColors=!0,e.roughness=.9,e.metalness=0,e.envMapIntensity=.9,e.emissiveIntensity!==void 0&&(e.emissiveIntensity=2.2),e.needsUpdate=!0}),x.add(X),document.querySelector(`#loading`).classList.add(`hidden`)},void 0,e=>{console.error(`creek env`,e),document.querySelector(`#loading`).textContent=`溪境加载失败`});var tt={afternoon:{top:7317976,horizon:14281431,sun:16773074,sunI:3.1,hemi:1.15,fog:13624540,fogD:.009,exp:1.08,water:5224621,night:0},golden:{top:8360900,horizon:16173452,sun:16757854,sunI:3.6,hemi:.85,fog:15190950,fogD:.01,exp:1.02,water:5941150,night:0},blue:{top:2374758,horizon:8164536,sun:10336480,sunI:1.7,hemi:.62,fog:7834792,fogD:.012,exp:.9,water:2977660,night:.15},night:{top:727088,horizon:2968152,sun:11127016,sunI:.65,hemi:.35,fog:1781815,fogD:.016,exp:.8,water:1522758,night:1}},nt=`afternoon`;function rt(e){let t=tt[e]||tt.afternoon;nt=e,E.top.value.set(t.top),E.horizon.value.set(t.horizon),E.sunColor.value.set(t.sun),O.color.set(t.sun),O.intensity=t.sunI,Ae.intensity=t.hemi,x.fog.color.set(t.fog),x.fog.density=t.fogD,b.toneMappingExposure=t.exp,k.shallow.value.set(t.water),k.topColor.value.set(t.top),k.horizonColor.value.set(t.horizon),k.sunColor.value.set(t.sun),k.sunDir.value.copy(O.position).normalize(),Xe.intensity=t.night*18,Y.uniforms?.focus&&(Y.uniforms.focus.value=11);for(let e of q)e.material.opacity=t.night*.85,e.visible=t.night>.1;document.querySelectorAll(`.time`).forEach(t=>t.classList.toggle(`on`,t.dataset.time===e))}rt(`afternoon`),document.querySelectorAll(`.time`).forEach(e=>e.addEventListener(`click`,()=>rt(e.dataset.time))),document.querySelector(`#dof`).addEventListener(`click`,e=>{Y.enabled=!Y.enabled,e.currentTarget.setAttribute(`aria-pressed`,String(Y.enabled))});var it=!1,Z={x:0,y:0},Q=0,at=0;v.addEventListener(`pointerdown`,e=>{it=!0,Z={x:e.clientX,y:e.clientY},v.setPointerCapture(e.pointerId)}),addEventListener(`pointerup`,()=>{it=!1}),addEventListener(`pointermove`,e=>{it&&(w-=(e.clientX-Z.x)*.0042,T=h.clamp(T-(e.clientY-Z.y)*.0032,-.8,.5),Z={x:e.clientX,y:e.clientY})}),addEventListener(`wheel`,e=>{Q+=e.deltaY*6e-4},{passive:!0});var $=new Set;addEventListener(`keydown`,e=>{[`KeyW`,`KeyA`,`KeyS`,`KeyD`,`ArrowUp`,`ArrowDown`,`ArrowLeft`,`ArrowRight`].includes(e.code)&&($.add(e.code),e.preventDefault())}),addEventListener(`keyup`,e=>$.delete(e.code));function ot(e){let t=($.has(`KeyW`)||$.has(`ArrowUp`)?1:0)-($.has(`KeyS`)||$.has(`ArrowDown`)?1:0),n=($.has(`KeyD`)||$.has(`ArrowRight`)?1:0)-($.has(`KeyA`)||$.has(`ArrowLeft`)?1:0),r=y?3:4.2;(t||n)&&(S.position.x+=(-Math.sin(w)*t+Math.cos(w)*n)*r*e,S.position.z+=(-Math.cos(w)*t-Math.sin(w)*n)*r*e),S.position.z+=Q*8,Q*=.9,S.position.z=h.clamp(S.position.z,-56,54),S.position.x=h.clamp(S.position.x,C(S.position.z)-9,C(S.position.z)+9),at+=e*(t||n?6.5:1.2),S.position.y=1.45+Math.sin(at)*.014,S.rotation.set(0,0,0),S.rotateY(w),S.rotateX(T)}var st=new we,ct=!0;function lt(){if(!ct)return;let e=Math.min(st.getDelta(),.05);ot(e),k.time.value+=e,D.position.copy(S.position);for(let e=0;e<q.length;e++){let t=q[e];t.position.y+=Math.sin(performance.now()*7e-4+e)*8e-4,t.visible&&(t.material.opacity=.35+.35*Math.sin(performance.now()*.0015+e*2))}X&&(X.position.y=0),R.userData.shader&&(R.userData.shader.uniforms.uTime.value+=e),Ye.uniforms.uTime.value+=e,W.opacity=.15+.07*Math.sin(performance.now()*.0012),J.render(),requestAnimationFrame(lt)}lt();function ut(){let e=innerWidth,t=innerHeight;b.setSize(e,t),J.setSize(e,t),S.aspect=e/t,S.updateProjectionMatrix(),Ze.setSize(e,t),$e.setSize(e,t),k.resolution.value.set(e,t)}addEventListener(`resize`,ut),window.__creek={scene:x,camera:S,renderer:b,composer:J,setTime:rt,get time(){return nt},bokeh:Y,water:A,env:()=>X,pause:()=>{ct=!1}};