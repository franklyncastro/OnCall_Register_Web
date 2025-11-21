import '../../../src/style/Home.css'
import TextType from '../TypeText/Typetext'


export default function Home() {
  return (
    <div>
       
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
