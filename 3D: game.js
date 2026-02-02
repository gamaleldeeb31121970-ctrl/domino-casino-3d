import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
// إضاءة محيطة قوية للواقعية
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 12, 8); // زاوية رؤية علوية مثل الصورة
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('game-container').appendChild(renderer.domElement);

// طاولة خضراء فخمة
const tableGeom = new THREE.CapsuleGeometry(7, 10, 4, 20); // شكل طاولة بيضاوي قليلاً
const tableMat = new THREE.MeshStandardMaterial({ color: 0x155d27, roughness: 0.5 });
const table = new THREE.Mesh(tableGeom, tableMat);
table.rotation.x = Math.PI / 2;
table.position.y = -0.5;
scene.add(table);

// دالة متطورة لإنشاء حجر دومينو بنقاط (Pips)
function createDetailedDomino(x, z, valA, valB) {
    const group = new THREE.Group();
    
    // جسم الحجر
    const bodyGeom = new THREE.BoxGeometry(1.2, 0.25, 2.2);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    group.add(body);

    // الخط الأسود في النص
    const line = new THREE.Mesh(
        new THREE.PlaneGeometry(1.1, 0.05),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    line.rotation.x = -Math.PI / 2;
    line.position.y = 0.13;
    group.add(line);

    // إضافة النقاط (تبسيط: سنضع نقطة واحدة كمثال في كل جهة)
    const dotGeom = new THREE.CircleGeometry(0.1, 16);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    if(valA > 0) {
        const dotA = new THREE.Mesh(dotGeom, dotMat);
        dotA.rotation.x = -Math.PI / 2;
        dotA.position.set(0, 0.13, 0.5);
        group.add(dotA);
    }
    
    if(valB > 0) {
        const dotB = new THREE.Mesh(dotGeom, dotMat);
        dotB.rotation.x = -Math.PI / 2;
        dotB.position.set(0, 0.13, -0.5);
        group.add(dotB);
    }

    group.position.set(x, 0, z);
    scene.add(group);
}

// رص بعض الحجارة في نص الطاولة
createDetailedDomino(0, 0, 6, 6);
createDetailedDomino(1.5, 0, 5, 4);
createDetailedDomino(-1.5, 0, 3, 2);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
