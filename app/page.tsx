
'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { 
  Search, Volume2, Home, PawPrint, Gamepad2, 
  Trophy, Globe2, Star, RotateCcw, Info, X,
  ChevronRight, Sparkles, Menu
} from 'lucide-react';

import * as THREE from 'three';

type Animal = {
  id: number;
  name: string;
  en: string;
  emoji: string;
  color: string;
  habitat: string;
  food: string;
  fact: string;
  category: string;
  accent: string;
};

const animals: Animal[] = [
  {id:1,name:'Sher',en:'Lion',emoji:'🦁',color:'#C78A36',accent:'#F5C66A',habitat:'Afrika savannasi',food:'Go‘sht',fact:'Sherlar guruh bo‘lib yashaydi.',category:'Yovvoyi'},
  {id:2,name:'Fil',en:'Elephant',emoji:'🐘',color:'#929DAA',accent:'#BBC5D0',habitat:'Afrika va Osiyo',food:'O‘t va barglar',fact:'Filning xartumi juda kuchli.',category:'Yovvoyi'},
  {id:3,name:'Jirafa',en:'Giraffe',emoji:'🦒',color:'#DDA43E',accent:'#925C2B',habitat:'Afrika savannasi',food:'Daraxt barglari',fact:'Jirafa dunyodagi eng baland hayvon.',category:'Yovvoyi'},
  {id:4,name:'Zebra',en:'Zebra',emoji:'🦓',color:'#F2F2F2',accent:'#222222',habitat:'Afrika',food:'O‘tlar',fact:'Har bir zebraning chiziqlari o‘ziga xos.',category:'Yovvoyi'},
  {id:5,name:'Yo‘lbars',en:'Tiger',emoji:'🐅',color:'#E68A2E',accent:'#292929',habitat:'O‘rmonlar',food:'Go‘sht',fact:'Yo‘lbars juda yaxshi suzadi.',category:'Yovvoyi'},
  {id:6,name:'Panda',en:'Panda',emoji:'🐼',color:'#F4F4F4',accent:'#222222',habitat:'Xitoy o‘rmonlari',food:'Bambuk',fact:'Panda kunining ko‘p qismini bambuk yeyish bilan o‘tkazadi.',category:'Yovvoyi'},
  {id:7,name:'Maymun',en:'Monkey',emoji:'🐒',color:'#A66A40',accent:'#E6B18C',habitat:'Tropik o‘rmon',food:'Meva va barglar',fact:'Maymunlar daraxtlarga chaqqon chiqadi.',category:'Yovvoyi'},
  {id:8,name:'Ayiq',en:'Bear',emoji:'🐻',color:'#87552E',accent:'#C18B59',habitat:'O‘rmon va tog‘lar',food:'Meva, baliq va o‘simliklar',fact:'Ayiqlar hid bilish qobiliyati kuchli hayvonlar.',category:'Yovvoyi'},
  {id:9,name:'Tulki',en:'Fox',emoji:'🦊',color:'#E87832',accent:'#F5E6D6',habitat:'O‘rmon va dasht',food:'Mayda hayvonlar',fact:'Tulki juda ziyrak hayvon.',category:'Yovvoyi'},
  {id:10,name:'Bo‘ri',en:'Wolf',emoji:'🐺',color:'#8C929B',accent:'#D5D8DE',habitat:'O‘rmon va tog‘lar',food:'Go‘sht',fact:'Bo‘rilar to‘da bo‘lib yashaydi.',category:'Yovvoyi'},
  {id:11,name:'Quyon',en:'Rabbit',emoji:'🐰',color:'#E6D5C8',accent:'#F4A8B5',habitat:'Dala va o‘tloqlar',food:'Sabzi va o‘tlar',fact:'Quyonning quloqlari juda sezgir.',category:'Uy'},
  {id:12,name:'Ot',en:'Horse',emoji:'🐴',color:'#96613E',accent:'#35251E',habitat:'O‘tloqlar',food:'O‘t va don',fact:'Otlar tez yugura oladi.',category:'Uy'},
  {id:13,name:'Sigir',en:'Cow',emoji:'🐄',color:'#F5F0E9',accent:'#393939',habitat:'Ferma',food:'O‘t',fact:'Sigirlar sut beradi.',category:'Uy'},
  {id:14,name:'Qo‘y',en:'Sheep',emoji:'🐑',color:'#F0E9DC',accent:'#D3C6B2',habitat:'Ferma va yaylov',food:'O‘t',fact:'Qo‘yning juni issiq kiyim tayyorlashda ishlatiladi.',category:'Uy'},
  {id:15,name:'Mushuk',en:'Cat',emoji:'🐱',color:'#D69A70',accent:'#F2D1B8',habitat:'Uy',food:'Maxsus yem va go‘sht',fact:'Mushuklar juda yaxshi eshitadi.',category:'Uy'},
  {id:16,name:'It',en:'Dog',emoji:'🐶',color:'#C68B58',accent:'#F1D4AD',habitat:'Uy',food:'Maxsus yem',fact:'Itlar insonning sodiq do‘stidir.',category:'Uy'},
  {id:17,name:'Timsoh',en:'Crocodile',emoji:'🐊',color:'#548B54',accent:'#A0B66A',habitat:'Daryo va botqoqlik',food:'Baliq va boshqa hayvonlar',fact:'Timsohlar suvda ham, quruqlikda ham yashaydi.',category:'Suv'},
  {id:18,name:'Delfin',en:'Dolphin',emoji:'🐬',color:'#72B9D9',accent:'#D4EDF8',habitat:'Dengiz va okean',food:'Baliq',fact:'Delfinlar tovushlar orqali muloqot qiladi.',category:'Suv'},
  {id:19,name:'Akula',en:'Shark',emoji:'🦈',color:'#73899B',accent:'#C6D7E0',habitat:'Okean',food:'Baliq va dengiz hayvonlari',fact:'Akulalar suvdagi hidlarni yaxshi sezadi.',category:'Suv'},
  {id:20,name:'Pingvin',en:'Penguin',emoji:'🐧',color:'#252C3B',accent:'#F5F5F5',habitat:'Antarktida',food:'Baliq va krill',fact:'Pingvinlar ucha olmaydi, lekin ajoyib suzadi.',category:'Suv'}
];

function AnimalModel({ animal }: { animal: Animal }) {
  const isElephant = animal.en === 'Elephant';
  const isGiraffe = animal.en === 'Giraffe';
  const isCrocodile = animal.en === 'Crocodile';
  const isDolphin = animal.en === 'Dolphin';
  const isPenguin = animal.en === 'Penguin';
  const isRabbit = animal.en === 'Rabbit';
  const isBird = isPenguin;
  const isFish = isDolphin || animal.en === 'Shark';

  return (
    <group position={[0, -0.4, 0]}>
      {/* Body */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <sphereGeometry args={[isGiraffe ? 0.48 : 0.75, 40, 40]} />
        <meshStandardMaterial color={animal.color} roughness={0.8}/>
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.65, 0.1]} castShadow>
        <sphereGeometry args={[0.47, 32, 32]}/>
        <meshStandardMaterial color={animal.color}/>
      </mesh>

      {/* Ears */}
      <mesh position={[-0.38, 2.02, 0]}>
        <sphereGeometry args={[0.18, 24, 24]}/>
        <meshStandardMaterial color={animal.accent}/>
      </mesh>
      <mesh position={[0.38, 2.02, 0]}>
        <sphereGeometry args={[0.18, 24, 24]}/>
        <meshStandardMaterial color={animal.accent}/>
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.17, 1.72, 0.51]}>
        <sphereGeometry args={[0.055, 16, 16]}/>
        <meshStandardMaterial color="#171717"/>
      </mesh>
      <mesh position={[0.17, 1.72, 0.51]}>
        <sphereGeometry args={[0.055, 16, 16]}/>
        <meshStandardMaterial color="#171717"/>
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.49, 0.53]}>
        <sphereGeometry args={[0.11, 20, 20]}/>
        <meshStandardMaterial color={animal.accent}/>
      </mesh>

      {/* Legs */}
      {[-0.42, 0.42].map((x) =>
        [-0.32, 0.32].map((z, i) => (
          <mesh key={`${x}-${z}`} position={[x, 0.08, z]}>
            <cylinderGeometry args={[0.13, 0.15, 0.8, 20]}/>
            <meshStandardMaterial color={animal.color}/>
          </mesh>
        ))
      )}

      {/* Special features */}
      {isElephant && (
        <mesh position={[0, 1.15, 0.62]} rotation={[0.2,0,0]}>
          <cylinderGeometry args={[0.12,0.16,0.85,24]}/>
          <meshStandardMaterial color={animal.accent}/>
        </mesh>
      )}

      {isGiraffe && (
        <mesh position={[0, 2.25, 0]}>
          <cylinderGeometry args={[0.17,0.23,1.1,24]}/>
          <meshStandardMaterial color={animal.color}/>
        </mesh>
      )}

      {isRabbit && (
        <>
          <mesh position={[-0.2,2.35,0]} rotation={[0,0,-0.2]}>
            <capsuleGeometry args={[0.1,0.7,8,16]}/>
            <meshStandardMaterial color={animal.accent}/>
          </mesh>
          <mesh position={[0.2,2.35,0]} rotation={[0,0,0.2]}>
            <capsuleGeometry args={[0.1,0.7,8,16]}/>
            <meshStandardMaterial color={animal.accent}/>
          </mesh>
        </>
      )}

      {isCrocodile && (
        <mesh position={[0,1.35,0.85]} scale={[1.2,0.45,1.5]}>
          <coneGeometry args={[0.5,1.4,24]}/>
          <meshStandardMaterial color={animal.accent}/>
        </mesh>
      )}

      {(isBird || isFish) && (
        <mesh position={[0,0.8,-0.85]} rotation={[0.5,0,0]}>
          <coneGeometry args={[0.4,0.9,4]}/>
          <meshStandardMaterial color={animal.accent}/>
        </mesh>
      )}
    </group>
  );
}

function Viewer({ animal }: { animal: Animal }) {
  return (
    <Canvas shadows camera={{position:[4,3,5],fov:42}}>
      <ambientLight intensity={1.5}/>
      <directionalLight position={[5,8,5]} intensity={2} castShadow/>
      <Suspense fallback={null}>
        <Environment preset="park"/>
        <AnimalModel animal={animal}/>
        <ContactShadows position={[0,-0.32,0]} opacity={0.3} scale={6} blur={2}/>
      </Suspense>
      <OrbitControls enablePan={false} minDistance={3} maxDistance={9} maxPolarAngle={Math.PI/1.8}/>
    </Canvas>
  );
}

export default function HomePage() {
  const [selected, setSelected] = useState<Animal>(animals[0]);
  const [category, setCategory] = useState('Barchasi');
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('Hayvonlar');
  const [sound, setSound] = useState(true);
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = animals.filter(a =>
    (category === 'Barchasi' || a.category === category) &&
    (a.name.toLowerCase().includes(search.toLowerCase()) ||
     a.en.toLowerCase().includes(search.toLowerCase()))
  );

  function speak(text: string) {
    if (!sound || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  }

  const questions = [
    {q:'Qaysi hayvonning xartumi bor?',a:['Sher','Fil','Zebra'],correct:1},
    {q:'Qaysi hayvon bambuk yeydi?',a:['Panda','Bo‘ri','Ot'],correct:0},
    {q:'Delfin qayerda yashaydi?',a:['Cho‘l','Dengiz','Tog‘'],correct:1},
    {q:'Qaysi hayvon eng baland?',a:['Quyon','Jirafa','Mushuk'],correct:1},
    {q:'Qaysi hayvon sut beradi?',a:['Sigir','Sher','Akula'],correct:0}
  ];

  function chooseAnswer(index: number) {
    if (answer !== null) return;
    setAnswer(index);
    if (index === questions[question].correct) setScore(s => s+1);
  }

  function nextQuestion() {
    setQuestion(q => (q+1)%questions.length);
    setAnswer(null);
  }

  return (
    <main className="app">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon">🦁</div>
          <div><b>ZOO<span>PLANET</span></b><small>3D ANIMAL WORLD</small></div>
        </div>
        <nav className={mobileMenu?'nav open':'nav'}>
          {['Hayvonlar','Virtual olam','Bilimlar sinovi'].map(t=>(
            <button key={t} className={tab===t?'nav-active':''} onClick={()=>{setTab(t);setMobileMenu(false)}}>
              {t}
            </button>
          ))}
        </nav>
        <div className="top-right">
          <button className="sound-btn" onClick={()=>setSound(!sound)}><Volume2 size={19}/></button>
          <button className="menu-btn" onClick={()=>setMobileMenu(!mobileMenu)}><Menu/></button>
          <div className="score"><Star size={17} fill="#FFC84B"/> {score} ball</div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-text">
          <span className="eyebrow"><Sparkles size={15}/> KASHF ET • O‘RGAN • O‘YNA</span>
          <h1>Hayvonot olami<br/><span>3D sayohat!</span></h1>
          <p>Sevimli hayvonlaringizni 360° tomosha qiling, ular haqida bilib oling va bilimlaringizni sinab ko‘ring.</p>
          <button className="primary-btn" onClick={()=>document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'})}>
            Sayohatni boshlash <ChevronRight/>
          </button>
        </div>
        <div className="hero-art">
          <div className="sun"></div>
          <div className="hero-animal">🦁</div>
          <span className="float float-one">🌿</span>
          <span className="float float-two">🦋</span>
          <span className="float float-three">⭐</span>
          <div className="hero-label">MENI O‘RGAN!</div>
        </div>
      </section>

      {tab === 'Hayvonlar' && (
        <section className="content" id="catalog">
          <div className="section-heading">
            <div><span className="eyebrow">KASHFIYOT BOSHLANDI</span><h2>Hayvonlar katalogi</h2><p>Hayvonni tanlang va 3D olamga sho‘ng‘ing.</p></div>
            <div className="animal-count"><PawPrint/> {animals.length} ta hayvon</div>
          </div>

          <div className="filters">
            <div className="search"><Search size={19}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Hayvon qidirish..."/></div>
            {['Barchasi','Yovvoyi','Uy','Suv'].map(c=>(
              <button key={c} className={category===c?'filter-active':''} onClick={()=>setCategory(c)}>{c}</button>
            ))}
          </div>

          <div className="workspace">
            <div className="catalog-grid">
              {filtered.map(a=>(
                <button key={a.id} className={`animal-card ${selected.id===a.id?'chosen':''}`} onClick={()=>setSelected(a)}>
                  <span className="animal-emoji">{a.emoji}</span>
                  <b>{a.name}</b>
                  <small>{a.en}</small>
                  {selected.id===a.id&&<span className="selected-dot">✓</span>}
                </button>
              ))}
            </div>

            <div className="viewer-panel">
              <div className="viewer-header">
                <div><span className="eyebrow">3D INTERAKTIV MODEL</span><h3>{selected.name}</h3><small>{selected.en}</small></div>
                <button className="round-btn" onClick={()=>setSelected({...selected})}><RotateCcw size={18}/></button>
              </div>
              <div className="viewer">
                <div className="viewer-bg"></div>
                <Viewer animal={selected}/>
                <span className="drag-hint">↔ Aylantirish uchun suring</span>
              </div>
              <div className="animal-info">
                <div className="info-item"><span>🌍</span><div><small>Yashash joyi</small><b>{selected.habitat}</b></div></div>
                <div className="info-item"><span>🍃</span><div><small>Oziqlanishi</small><b>{selected.food}</b></div></div>
                <div className="fact"><Sparkles size={18}/><p>{selected.fact}</p></div>
                <button className="primary-btn full" onClick={()=>speak(selected.en)}><Volume2/> Inglizcha nomini eshitish</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {tab === 'Virtual olam' && (
        <section className="content">
          <span className="eyebrow">VIRTUAL SAYOHAT</span>
          <h2>Uchta ajoyib dunyo</h2>
          <p>Yashash muhitlarini kashf eting va hayvonlarni o‘rganing.</p>
          <div className="world-grid">
            {[
              {name:'Afrika savannasi',emoji:'🌅',desc:'Sher, jirafa, fil va zebra',color:'#FFE2B8',cat:'Yovvoyi'},
              {name:'Tropik o‘rmon',emoji:'🌴',desc:'Maymun, panda, ayiq va tulki',color:'#D7F2D8',cat:'Yovvoyi'},
              {name:'Suv osti olami',emoji:'🌊',desc:'Delfin, akula va timsoh',color:'#CDEBFA',cat:'Suv'}
            ].map(w=>(
              <button className="world-card" key={w.name} style={{background:w.color}} onClick={()=>{setCategory(w.cat);setTab('Hayvonlar')}}>
                <span>{w.emoji}</span><h3>{w.name}</h3><p>{w.desc}</p><b>Sayohat qilish →</b>
              </button>
            ))}
          </div>
        </section>
      )}

      {tab === 'Bilimlar sinovi' && (
        <section className="content quiz-content">
          <div className="quiz-card">
            <span className="eyebrow"><Trophy size={16}/> BILIMLARINGIZNI SINANG</span>
            <h2>Yosh zoolog testi</h2>
            <p>Har bir savolga to‘g‘ri javob bering va yulduzlar to‘plang!</p>
            <div className="progress"><div style={{width:`${((question+1)/questions.length)*100}%`}}/></div>
            <small>Savol {question+1} / {questions.length}</small>
            <h3>{questions[question].q}</h3>
            <div className="answers">
              {questions[question].a.map((a,i)=>(
                <button key={a} disabled={answer!==null} className={answer===i?(i===questions[question].correct?'correct':'wrong'):''} onClick={()=>chooseAnswer(i)}>
                  {String.fromCharCode(65+i)}. {a}
                </button>
              ))}
            </div>
            {answer!==null&&<div className="feedback">{answer===questions[question].correct?'🎉 Barakalla! To‘g‘ri javob!':'😊 Yana urinib ko‘ring!'} <button onClick={nextQuestion}>Keyingi savol →</button></div>}
            <div className="quiz-score"><Star fill="#FFC84B" color="#FFC84B"/> Sizning ballingiz: {score}</div>
          </div>
        </section>
      )}

      <footer>
        <div className="brand"><div className="brand-icon">🦁</div><b>ZOOPLANET 3D</b></div>
        <p>Bilim olish — eng qiziqarli sarguzasht!</p>
        <small>© 2026 ZOOPLANET 3D • Ta’limiy loyiha</small>
      </footer>
    </main>
  );
}
