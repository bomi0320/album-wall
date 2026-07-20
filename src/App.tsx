import { Canvas } from '@react-three/fiber';
import Room from './scene/Room';
import './App.css';

function App() {
  return (
    <Canvas
      camera={{
        position: [0, 3, 10],
        fov: 60,
      }}
    >
      <Room />
    </Canvas>
  );
}

export default App;
