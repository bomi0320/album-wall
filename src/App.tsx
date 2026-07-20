import { Canvas } from '@react-three/fiber';
import Room from './scene/Room';
import './App.css';

function App() {
  return (
    <Canvas
      camera={{
        position: [10, 5, 10],
        fov: 65,
      }}
    >
      <Room />
    </Canvas>
  );
}

export default App;
