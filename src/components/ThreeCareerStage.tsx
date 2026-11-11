import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CareerKey, CareerLevelInfo } from '../types/career';
import { CAREER_TRACKS } from '../utils/quizLogic';
import { Camera, RotateCw, ZoomIn, ZoomOut, Sparkles, CheckCircle2 } from 'lucide-react';

interface ThreeCareerStageProps {
  careerKey: CareerKey;
  currentLevel: number; // 0 to 5
  score: number;
  maxScore: number;
  isCelebrating: boolean;
  isLevelingUp: boolean;
  onResetCelebration?: () => void;
}

export const ThreeCareerStage: React.FC<ThreeCareerStageProps> = ({
  careerKey,
  currentLevel,
  score,
  maxScore,
  isCelebrating,
  isLevelingUp,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [cameraView, setCameraView] = useState<'full' | 'portrait' | 'action'>('full');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // References to keep mutable three.js items without re-mounting
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const characterGroupRef = useRef<THREE.Group | null>(null);
  const envGroupRef = useRef<THREE.Group | null>(null);
  const particlesGroupRef = useRef<THREE.Group | null>(null);
  const groundMeshRef = useRef<THREE.Mesh | null>(null);

  // Props to trigger in animation loop
  const jumpTimeRef = useRef<number>(0);
  const isJumpingRef = useRef<boolean>(false);
  const isSpinningRef = useRef<boolean>(false);

  // Trigger jump animation when isCelebrating changes to true
  useEffect(() => {
    if (isCelebrating) {
      isJumpingRef.current = true;
      jumpTimeRef.current = 0;
      spawnBurstParticles(25);
    }
  }, [isCelebrating]);

  // Trigger level-up spin & big particle blast
  useEffect(() => {
    if (isLevelingUp) {
      isSpinningRef.current = true;
      spawnBurstParticles(60);
      const timer = setTimeout(() => {
        isSpinningRef.current = false;
      }, 2400);
      return () => clearTimeout(timer);
    }
  }, [isLevelingUp]);

  // Helper to spawn burst particles
  const spawnBurstParticles = useCallback((count: number) => {
    if (!particlesGroupRef.current) return;
    const group = particlesGroupRef.current;
    const colors = [0xf59e0b, 0x10b981, 0x3b82f6, 0xec4899, 0xffffff];

    for (let i = 0; i < count; i++) {
      const size = 0.08 + Math.random() * 0.12;
      const geom = new THREE.BoxGeometry(size, size, size);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.3,
        metalness: 0.7,
      });
      const p = new THREE.Mesh(geom, mat);
      p.position.set(
        (Math.random() - 0.5) * 0.6,
        1.8 + Math.random() * 0.8,
        (Math.random() - 0.5) * 0.6
      );
      p.userData = {
        vx: (Math.random() - 0.5) * 0.16,
        vy: 0.15 + Math.random() * 0.18,
        vz: (Math.random() - 0.5) * 0.16,
        rotX: (Math.random() - 0.5) * 0.3,
        rotY: (Math.random() - 0.5) * 0.3,
        life: 1.0,
      };
      group.add(p);
    }
  }, []);

  // Update character model when career or level changes
  useEffect(() => {
    if (!characterGroupRef.current || !envGroupRef.current || !sceneRef.current) return;
    rebuildCharacter(careerKey, currentLevel);
  }, [careerKey, currentLevel]);

  // Camera preset handler
  const setCameraPreset = (view: 'full' | 'portrait' | 'action') => {
    setCameraView(view);
    const camera = cameraRef.current;
    if (!camera) return;

    if (view === 'full') {
      camera.position.set(0, 2.7, 7.8);
      camera.lookAt(0, 1.8, 0);
    } else if (view === 'portrait') {
      camera.position.set(0, 2.9, 4.4);
      camera.lookAt(0, 2.5, 0);
    } else if (view === 'action') {
      camera.position.set(2.8, 3.2, 6.8);
      camera.lookAt(0, 1.8, 0);
    }
  };

  const rebuildCharacter = (cKey: CareerKey, lvl: number) => {
    const charGroup = characterGroupRef.current;
    const envGroup = envGroupRef.current;
    const scene = sceneRef.current;
    if (!charGroup || !envGroup || !scene) return;

    // Clear old children
    while (charGroup.children.length > 0) {
      charGroup.remove(charGroup.children[0]);
    }
    while (envGroup.children.length > 0) {
      envGroup.remove(envGroup.children[0]);
    }

    const career = CAREER_TRACKS[cKey];
    scene.background = new THREE.Color(career.bgThree);
    if (scene.fog) {
      scene.fog.color = new THREE.Color(career.bgThree);
    }

    // Material Library
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xffd1b3, roughness: 0.7 });
    const darkPantsMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });
    const shoesMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.25, metalness: 0.85 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.4 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.8 });

    // Outfits & Colors
    let torsoMat: THREE.Material;
    let legsMat: THREE.Material = darkPantsMat;

    if (cKey === 'medical') {
      if (lvl === 0) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.6 }); // intern teal/sky
      } else if (lvl === 1 || lvl === 2) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.6 }); // nurse scrubs
        legsMat = torsoMat;
      } else if (lvl === 3 || lvl === 4) {
        torsoMat = whiteMat; // doctor lab coat
        legsMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.7 });
      } else {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 }); // executive chief coat
        legsMat = torsoMat;
      }
    } else if (cKey === 'finance') {
      if (lvl === 0) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 }); // casual
      } else if (lvl === 1) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 }); // trainee suit
      } else if (lvl === 2 || lvl === 3) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.5 }); // navy business suit
      } else if (lvl === 4) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4 }); // director charcoal suit
      } else {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.3, metalness: 0.2 }); // luxury CEO tux
      }
    } else {
      // education
      if (lvl === 0) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.6 }); // orange student hoodie
      } else if (lvl === 1 || lvl === 2) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.5 }); // green FIT store polo
      } else if (lvl === 3) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.7 }); // trainee teacher cardigan
      } else if (lvl === 4) {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.6 }); // cool bio teacher blazer
      } else {
        torsoMat = new THREE.MeshStandardMaterial({ color: 0x312e81, roughness: 0.4 }); // school principal robe
      }
    }

    // --- LEGS & SHOES ---
    const legGeo = new THREE.CylinderGeometry(0.16, 0.13, 1.15, 16);
    const shoeGeo = new THREE.BoxGeometry(0.24, 0.18, 0.42);

    // Left leg
    const leftLeg = new THREE.Mesh(legGeo, legsMat);
    leftLeg.position.set(-0.28, 0.68, 0);
    leftLeg.castShadow = true;
    charGroup.add(leftLeg);

    const leftShoe = new THREE.Mesh(shoeGeo, shoesMat);
    leftShoe.position.set(-0.28, 0.09, 0.08);
    leftShoe.castShadow = true;
    charGroup.add(leftShoe);

    // Right leg
    const rightLeg = new THREE.Mesh(legGeo, legsMat);
    rightLeg.position.set(0.28, 0.68, 0);
    rightLeg.castShadow = true;
    charGroup.add(rightLeg);

    const rightShoe = new THREE.Mesh(shoeGeo, shoesMat);
    rightShoe.position.set(0.28, 0.09, 0.08);
    rightShoe.castShadow = true;
    charGroup.add(rightShoe);

    // --- TORSO ---
    const torsoGeo = new THREE.BoxGeometry(0.95, 1.25, 0.55);
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.set(0, 1.82, 0);
    torso.castShadow = true;
    charGroup.add(torso);

    // Lab coat flaps or suit collar detail
    if (lvl >= 3 && (cKey === 'medical' || cKey === 'finance')) {
      const collarGeo = new THREE.BoxGeometry(0.2, 0.7, 0.08);
      const cLeft = new THREE.Mesh(collarGeo, lvl >= 5 ? goldMat : whiteMat);
      cLeft.position.set(-0.26, 2.05, 0.28);
      cLeft.rotation.z = -0.3;
      charGroup.add(cLeft);

      const cRight = new THREE.Mesh(collarGeo, lvl >= 5 ? goldMat : whiteMat);
      cRight.position.set(0.26, 2.05, 0.28);
      cRight.rotation.z = 0.3;
      charGroup.add(cRight);
    }

    // --- NECK & HEAD ---
    const neckGeo = new THREE.CylinderGeometry(0.14, 0.15, 0.22, 16);
    const neck = new THREE.Mesh(neckGeo, skinMat);
    neck.position.set(0, 2.48, 0);
    charGroup.add(neck);

    const headGeo = new THREE.SphereGeometry(0.46, 32, 28);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.position.set(0, 2.95, 0);
    head.castShadow = true;
    charGroup.add(head);

    // Hair
    const hairGeo = new THREE.SphereGeometry(0.48, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.58);
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 3.02, -0.04);
    charGroup.add(hair);

    // Face Details: Eyes
    const eyeGeo = new THREE.SphereGeometry(0.055, 12, 12);
    const eyeWhiteGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const darkEyeMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });

    const leftEyeWhite = new THREE.Mesh(eyeWhiteGeo, whiteMat);
    leftEyeWhite.position.set(-0.16, 2.98, 0.4);
    const leftPupil = new THREE.Mesh(eyeGeo, darkEyeMat);
    leftPupil.position.set(-0.16, 2.98, 0.46);
    charGroup.add(leftEyeWhite, leftPupil);

    const rightEyeWhite = new THREE.Mesh(eyeWhiteGeo, whiteMat);
    rightEyeWhite.position.set(0.16, 2.98, 0.4);
    const rightPupil = new THREE.Mesh(eyeGeo, darkEyeMat);
    rightPupil.position.set(0.16, 2.98, 0.46);
    charGroup.add(rightEyeWhite, rightPupil);

    // Friendly Smile (curving upwards)
    const smileGeo = new THREE.TorusGeometry(0.11, 0.022, 8, 18, Math.PI);
    const smile = new THREE.Mesh(smileGeo, new THREE.MeshBasicMaterial({ color: 0x7c2d12 }));
    smile.position.set(0, 2.82, 0.44);
    smile.rotation.z = Math.PI;
    smile.rotation.x = -0.15;
    charGroup.add(smile);

    // --- ARMS ---
    const armGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.95, 16);
    const handGeo = new THREE.SphereGeometry(0.11, 16, 16);

    const leftArm = new THREE.Mesh(armGeo, torsoMat);
    leftArm.position.set(-0.65, 1.8, 0);
    leftArm.rotation.z = 0.22;
    leftArm.castShadow = true;
    charGroup.add(leftArm);

    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(-0.84, 1.34, 0.08);
    charGroup.add(leftHand);

    const rightArm = new THREE.Mesh(armGeo, torsoMat);
    rightArm.position.set(0.65, 1.8, 0);
    rightArm.rotation.z = -0.22;
    rightArm.castShadow = true;
    charGroup.add(rightArm);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0.84, 1.34, 0.08);
    charGroup.add(rightHand);

    // --- CAREER SPECIFIC PROPS & ACCESSORIES ---

    // 1. MEDICAL
    if (cKey === 'medical') {
      // Red Cross Badge (L1+)
      if (lvl >= 1) {
        const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.22, 0.04), redMat);
        const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 0.04), redMat);
        vBar.position.set(0.25, 2.05, 0.3);
        hBar.position.set(0.25, 2.05, 0.3);
        charGroup.add(vBar, hBar);
      }

      // Clipboard in hand (L2+)
      if (lvl >= 2) {
        const board = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.55, 0.05),
          new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 })
        );
        const paper = new THREE.Mesh(
          new THREE.BoxGeometry(0.34, 0.48, 0.06),
          whiteMat
        );
        board.position.set(-0.86, 1.45, 0.35);
        board.rotation.x = -0.6;
        board.rotation.y = 0.2;
        paper.position.set(-0.86, 1.45, 0.36);
        paper.rotation.x = -0.6;
        paper.rotation.y = 0.2;
        charGroup.add(board, paper);
      }

      // Stethoscope around neck (L3+)
      if (lvl >= 3) {
        const stethCurve = new THREE.TorusGeometry(0.32, 0.035, 12, 32, Math.PI);
        const stethMesh = new THREE.Mesh(
          stethCurve,
          new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.7 })
        );
        stethMesh.position.set(0, 2.45, 0.2);
        stethMesh.rotation.x = Math.PI + 0.35;
        charGroup.add(stethMesh);

        // Chest piece
        const chestPiece = new THREE.Mesh(
          new THREE.CylinderGeometry(0.07, 0.07, 0.04, 16),
          goldMat
        );
        chestPiece.rotation.x = Math.PI / 2;
        chestPiece.position.set(0.08, 1.9, 0.3);
        charGroup.add(chestPiece);
      }

      // Head mirror reflector (L4+)
      if (lvl >= 4) {
        const band = new THREE.Mesh(
          new THREE.CylinderGeometry(0.48, 0.48, 0.07, 24),
          new THREE.MeshStandardMaterial({ color: 0x334155 })
        );
        band.position.set(0, 3.25, 0);
        const mirror = new THREE.Mesh(
          new THREE.CylinderGeometry(0.14, 0.14, 0.04, 16),
          goldMat
        );
        mirror.rotation.x = Math.PI / 2;
        mirror.position.set(0, 3.25, 0.48);
        charGroup.add(band, mirror);
      }

      // Golden Caduceus / Rod of Asclepius & Doctor Desk (L5)
      if (lvl === 5) {
        const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.5, 16), goldMat);
        staff.position.set(0.9, 1.8, 0.3);
        charGroup.add(staff);

        // Snake coils on staff
        const coil = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.03, 8, 24, Math.PI * 2), goldMat);
        coil.rotation.x = Math.PI / 2;
        coil.position.set(0.9, 2.1, 0.3);
        charGroup.add(coil);

        // Modern Director Clinic Desk
        const desk = new THREE.Mesh(
          new THREE.BoxGeometry(2.6, 0.9, 1.1),
          new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.2 })
        );
        desk.position.set(0, 0.45, -1.2);
        desk.castShadow = true;
        envGroup.add(desk);

        // Gold Nameplate "KLINIKDIREKTOR"
        const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.06), goldMat);
        plaque.position.set(0, 0.95, -0.8);
        envGroup.add(plaque);
      }
    }

    // 2. FINANCE
    if (cKey === 'finance') {
      // Tie (L1+)
      if (lvl >= 1) {
        const tieGeo = new THREE.ConeGeometry(0.11, 0.65, 4);
        const tie = new THREE.Mesh(tieGeo, lvl >= 5 ? goldMat : redMat);
        tie.rotation.x = Math.PI;
        tie.position.set(0, 2.05, 0.3);
        charGroup.add(tie);
      }

      // Leather Briefcase (L2+)
      if (lvl >= 2) {
        const caseGeo = new THREE.BoxGeometry(0.55, 0.42, 0.18);
        const bCase = new THREE.Mesh(
          caseGeo,
          new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.5 })
        );
        bCase.position.set(0.92, 1.05, 0.05);
        bCase.castShadow = true;

        const handle = new THREE.Mesh(
          new THREE.TorusGeometry(0.08, 0.02, 6, 12, Math.PI),
          goldMat
        );
        handle.position.set(0.92, 1.3, 0.05);
        charGroup.add(bCase, handle);
      }

      // Gold Watch on wrist (L3+)
      if (lvl >= 3) {
        const watch = new THREE.Mesh(
          new THREE.CylinderGeometry(0.13, 0.13, 0.08, 16),
          goldMat
        );
        watch.position.set(-0.82, 1.4, 0.08);
        charGroup.add(watch);
      }

      // Top Hat (L4+)
      if (lvl >= 4) {
        const brim = new THREE.Mesh(
          new THREE.CylinderGeometry(0.68, 0.68, 0.05, 24),
          new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.3 })
        );
        brim.position.set(0, 3.42, 0);

        const crown = new THREE.Mesh(
          new THREE.CylinderGeometry(0.44, 0.44, 0.55, 24),
          new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.3 })
        );
        crown.position.set(0, 3.72, 0);

        const ribbon = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.1, 24), redMat);
        ribbon.position.set(0, 3.5, 0);

        charGroup.add(brim, crown, ribbon);
      }

      // Bank Safe & Mahogany Desk (L5)
      if (lvl === 5) {
        const bankDesk = new THREE.Mesh(
          new THREE.BoxGeometry(2.8, 0.9, 1.2),
          new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.3, metalness: 0.1 })
        );
        bankDesk.position.set(0, 0.45, -1.2);
        bankDesk.castShadow = true;
        envGroup.add(bankDesk);

        // Safe
        const safe = new THREE.Mesh(
          new THREE.BoxGeometry(0.9, 0.9, 0.8),
          new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.25, metalness: 0.85 })
        );
        safe.position.set(1.7, 0.45, -0.6);
        safe.castShadow = true;

        const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.05, 16), goldMat);
        dial.rotation.x = Math.PI / 2;
        dial.position.set(1.7, 0.5, -0.18);
        envGroup.add(safe, dial);
      }
    }

    // 3. EDUCATION & RETAIL
    if (cKey === 'education') {
      // FIT Cap for student/retail (L0-2)
      if (lvl <= 2) {
        const cap = new THREE.Mesh(
          new THREE.SphereGeometry(0.48, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
          new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.6 })
        );
        cap.position.set(0, 3.02, 0);

        const visor = new THREE.Mesh(
          new THREE.BoxGeometry(0.55, 0.04, 0.36),
          new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.6 })
        );
        visor.position.set(0, 3.08, 0.45);
        charGroup.add(cap, visor);
      }

      // Teacher Glasses (L3+)
      if (lvl >= 3) {
        const glassLeft = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.02, 8, 20), goldMat);
        glassLeft.position.set(-0.16, 2.98, 0.48);
        const glassRight = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.02, 8, 20), goldMat);
        glassRight.position.set(0.16, 2.98, 0.48);
        const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 0.02), goldMat);
        bridge.position.set(0, 2.98, 0.48);
        charGroup.add(glassLeft, glassRight, bridge);
      }

      // Book Stack / Lesson Folder (L3+)
      if (lvl >= 3) {
        const book1 = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.08, 0.5),
          new THREE.MeshStandardMaterial({ color: 0xef4444 })
        );
        book1.position.set(-0.84, 1.45, 0.28);
        book1.rotation.y = 0.3;

        const book2 = new THREE.Mesh(
          new THREE.BoxGeometry(0.38, 0.08, 0.48),
          new THREE.MeshStandardMaterial({ color: 0x3b82f6 })
        );
        book2.position.set(-0.84, 1.54, 0.28);
        book2.rotation.y = 0.15;
        charGroup.add(book1, book2);
      }

      // Graduation Cap / Mortarboard (L4+)
      if (lvl >= 4) {
        const board = new THREE.Mesh(
          new THREE.BoxGeometry(1.05, 0.04, 1.05),
          new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.5 })
        );
        board.position.set(0, 3.52, 0);
        board.rotation.y = Math.PI / 4;

        const skullCap = new THREE.Mesh(
          new THREE.CylinderGeometry(0.42, 0.44, 0.22, 24),
          new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.5 })
        );
        skullCap.position.set(0, 3.4, 0);

        const button = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 12), goldMat);
        button.position.set(0, 3.55, 0);

        charGroup.add(board, skullCap, button);
      }

      // Director's Lectern & Gold Diploma (L5)
      if (lvl === 5) {
        const lectern = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 1.35, 0.7),
          new THREE.MeshStandardMaterial({ color: 0x581c87, roughness: 0.4, metalness: 0.2 })
        );
        lectern.position.set(0, 0.68, 1.1);
        lectern.castShadow = true;
        envGroup.add(lectern);

        const scroll = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 0.6, 16),
          whiteMat
        );
        scroll.rotation.z = Math.PI / 2;
        scroll.position.set(0, 1.4, 1.1);
        const ribbon = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16), goldMat);
        ribbon.rotation.z = Math.PI / 2;
        ribbon.position.set(0, 1.4, 1.1);
        envGroup.add(scroll, ribbon);
      }
    }

    // --- GOLDEN THRONE / PEDESTAL AT MAX LEVEL (L5) ---
    if (groundMeshRef.current) {
      if (lvl === 5) {
        groundMeshRef.current.material = goldMat;
      } else {
        groundMeshRef.current.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.4,
          metalness: 0.1,
        });
      }
    }
  };

  // Three.js Mount Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const initialCareer = CAREER_TRACKS[careerKey];
    scene.background = new THREE.Color(initialCareer.bgThree);
    scene.fog = new THREE.Fog(initialCareer.bgThree, 9, 24);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.7, 7.8);
    camera.lookAt(0, 1.8, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // Studio Environment map
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Fallback
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x94a3b8, 0.45);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(4, 9, 6);
    if (!isSoftwareGl) {
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.bias = -0.0005;
    }
    scene.add(dirLight);

    // Fill rim light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.5);
    rimLight.position.set(-5, 6, -4);
    scene.add(rimLight);

    // Ground stage platform
    const groundGeo = new THREE.CylinderGeometry(3.2, 3.6, 0.35, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.18;
    ground.receiveShadow = !isSoftwareGl;
    scene.add(ground);
    groundMeshRef.current = ground;

    // Contact shadow ring
    const shadowGeo = new THREE.RingGeometry(0.1, 2.5, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // Character Group
    const charGroup = new THREE.Group();
    scene.add(charGroup);
    characterGroupRef.current = charGroup;

    // Environment Group
    const envGroup = new THREE.Group();
    scene.add(envGroup);
    envGroupRef.current = envGroup;

    // Particles Group
    const particlesGroup = new THREE.Group();
    scene.add(particlesGroup);
    particlesGroupRef.current = particlesGroup;

    // Build initial character
    rebuildCharacter(careerKey, currentLevel);

    // Drag to rotate interaction
    let isDragging = false;
    let prevMouseX = 0;
    const domElem = renderer.domElement;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !charGroup) return;
      const deltaX = e.clientX - prevMouseX;
      charGroup.rotation.y += deltaX * 0.012;
      prevMouseX = e.clientX;
    };
    const onPointerUp = () => {
      isDragging = false;
    };

    domElem.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animFrameId = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    function tick() {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const time = now * 0.001;
      frameCount++;

      // Idle sway / breathing
      if (!isSpinningRef.current) {
        if (autoRotate && !isDragging) {
          charGroup.rotation.y = Math.sin(time * 0.8) * 0.35;
        }
      } else {
        // Spin fast during promotion
        charGroup.rotation.y += 0.16;
      }

      // Celebratory jump
      if (isJumpingRef.current) {
        jumpTimeRef.current += delta * 7.5;
        charGroup.position.y = Math.sin(jumpTimeRef.current) * 0.65;
        if (jumpTimeRef.current >= Math.PI) {
          isJumpingRef.current = false;
          charGroup.position.y = 0;
        }
      }

      // Animate particles
      const pGroup = particlesGroupRef.current;
      if (pGroup) {
        for (let i = pGroup.children.length - 1; i >= 0; i--) {
          const p = pGroup.children[i] as THREE.Mesh;
          p.position.x += p.userData.vx;
          p.position.y += p.userData.vy;
          p.position.z += p.userData.vz;
          p.userData.vy -= 0.007; // gravity
          p.rotation.x += p.userData.rotX;
          p.rotation.y += p.userData.rotY;
          p.userData.life -= delta * 0.9;
          const scale = Math.max(0, p.userData.life);
          p.scale.set(scale, scale, scale);

          if (p.userData.life <= 0) {
            pGroup.remove(p);
          }
        }
      }

      renderer.render(scene, camera);
      animFrameId = requestAnimationFrame(tick);
    }

    tick();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(animFrameId);
      domElem.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  const career = CAREER_TRACKS[careerKey];
  const levelInfo: CareerLevelInfo = career.levels[currentLevel] || career.levels[0];
  const progressPercent = Math.min(100, (score / maxScore) * 100);

  return (
    <div className="relative w-full h-full min-h-[380px] bg-slate-900 overflow-hidden select-none">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        data-testid="three-canvas-container"
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Top HUD: Career Rank & Level Progress */}
      <div className="absolute top-3 left-3 right-3 flex flex-wrap items-start justify-between gap-2 pointer-events-none">
        {/* Career & Rank Card */}
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 shadow-xl max-w-[260px] pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{career.icon}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {career.name}
                </span>
                <span className="bg-amber-500/20 text-amber-300 text-[11px] font-bold px-1.5 py-0.5 rounded">
                  {levelInfo.badge}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-1">
                {levelInfo.title}
              </h2>
            </div>
          </div>

          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            {levelInfo.description}
          </p>

          {/* XP Progress Bar */}
          <div className="mt-2.5">
            <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
              <span>Karriere-Fortschritt</span>
              <span className="font-bold text-amber-400">
                {score} / {maxScore} Pkt ({Math.round(progressPercent)}%)
              </span>
            </div>
            <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Unlocked Accessories Pills */}
          <div className="mt-2 pt-2 border-t border-slate-800 flex flex-wrap gap-1">
            <span className="text-[10px] text-slate-400 font-medium">Freigeschaltet:</span>
            {levelInfo.unlockedProps.map((propName, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[10px] font-semibold bg-slate-800/90 text-sky-300 px-1.5 py-0.5 rounded border border-slate-700/60"
              >
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                {propName}
              </span>
            ))}
          </div>
        </div>

        {/* View Controls Pill */}
        <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-1 rounded-xl shadow-lg pointer-events-auto">
          <button
            onClick={() => setCameraPreset('full')}
            title="Ganzkörperansicht"
            className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
              cameraView === 'full' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Voll
          </button>
          <button
            onClick={() => setCameraPreset('portrait')}
            title="Porträt & Ausrüstung"
            className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
              cameraView === 'portrait' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Porträt
          </button>
          <button
            onClick={() => setCameraPreset('action')}
            title="Studio-Winkel"
            className={`px-2 py-1 text-xs font-medium rounded-lg transition-colors ${
              cameraView === 'action' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title="Drehung ein/aus"
            className={`p-1.5 rounded-lg transition-colors ${
              autoRotate ? 'text-amber-400 bg-slate-800' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-2 left-3 text-[11px] text-slate-400 bg-slate-950/60 px-2 py-1 rounded-md backdrop-blur-sm pointer-events-none hidden sm:block">
        💡 Mit der Maus / Finger ziehen, um die 3D-Figur frei im Raum zu drehen
      </div>
    </div>
  );
};
