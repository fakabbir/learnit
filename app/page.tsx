import Image from 'next/image'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="">
      <div className="container">
        <div className="video-embed">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/4CsdNhcE07g" frameBorder="0" allowFullScreen></iframe>
        </div>
        <div className="video-list">
           
            <div className="video-list-item">
                <a href="#">Video 1</a>
            </div>
            <div className="video-list-item">
                <a href="#">Video 2</a>
            </div>
            <div className="video-list-item">
                <a href="#">Video 3</a>
            </div>
          
        </div>
        <Button>Click me</Button>
    </div>
      </main>
  )
}
