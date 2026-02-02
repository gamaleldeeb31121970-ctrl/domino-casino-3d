import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// إعداد المشهد
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

// الكاميرا
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 10);

// المحرك (Renderer)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // تفعيل الظلال للواقعية
document.getElementById('game-container').appendChild(renderer.domElement);

// الإضاءة (سر الواقعية)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(0, 15, 5);
spotLight.castShadow = true;
scene.add(spotLight);

// إنشاء الطاولة الخضراء
const tableGeometry = new THREE.BoxGeometry(15, 0.5, 10);
const tableMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x007722, // اللون الأخضر الساطع
    roughness: 0.8 
});
const table = new THREE.Mesh(tableGeometry, tableMaterial);
table.receiveShadow = true;
table.position.y = -0.25;
scene.add(table);

// دالة لإنشاء حجر دومينو (أبيض ساطع)
function createDomino(x, z, rotation = 0) {
    const group = new THREE.Group();
    
    // جسم الحجر
    const bodyGeom = new THREE.BoxGeometry(1, 0.2, 2);
    const bodyMat = new THREE.MeshStandardMaterial({ 
        color: 0xffffff, // أبيض ساطع
        roughness: 0.1, 
        metalness: 0.1 
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    body.castShadow = true;
    group.add(body);

    // الخط الفاصل في المنتصف
    const lineGeom = new THREE.PlaneGeometry(0.9, 0.02);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
    const line = new THREE.Mesh(lineGeom, lineMat);
    line.rotation.x = -Math.PI / 2;
    line.position.y = 0.11;
    group.add(line);

    group.position.set(x, 0.1, z);
    group.rotation.y = rotation;
    scene.add(group);
}

// إضافة بعض الحجارة للتجربة
createDomino(0, 0);
createDomino(1.2, 0);
createDomino(-1.5, 1, Math.PI / 2);

// تحريك الكاميرا بالماوس
const controls = new OrbitControls(camera, renderer.domElement);

// حلقة التحديث (Animation Loop)
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// ضبط المقاس عند تغيير حجم النافذة
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
