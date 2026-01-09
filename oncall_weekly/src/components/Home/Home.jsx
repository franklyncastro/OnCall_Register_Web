import './Home.module.css'
import TextType from '../TypeText/Typetext'


export default function Home() {
  return (
    <div className='container_home'>
        <TextType 
          text={["La disciplina ", "tarde o temprano", "supera al talento.!"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
        />

    </div>
  )
}
