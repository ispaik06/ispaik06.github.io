---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
---

## Inseong (Joseph) Paik

I study **Mechanical Engineering** at [**KAIST**](https://www.kaist.ac.kr/en/) with a double major in **Electrical Engineering**. My work focuses on **robot dynamics**, **control**, **embedded systems**, and **learning-based robotics**, with increasing attention to embodied systems that tie perception, decision-making, and physical interaction into one stack.

Links: [GitHub](https://github.com/ispaik06) · [YouTube](https://www.youtube.com/@_ispaik.0)

This page is the compact version of what I build and how I work. The blog itself is where I keep the longer notes, implementation details, and project logs.

---

## Current Focus

- **Legged robotics:** humanoid locomotion, MPC, contact dynamics, whole-body behavior
- **Robot learning:** reinforcement learning, imitation learning, vision-conditioned policies
- **VLA / Physical AI:** vision-language-action systems, embodied intelligence, real-world robot behavior
- **Real systems:** getting hardware, firmware, control, and software to cooperate under constraints

---

## Education

**[KAIST](https://www.kaist.ac.kr/en/)**  
*Feb 2025 - Present*  
B.S. in Mechanical Engineering, Double Major in Electrical Engineering  
GPA: **4.10 / 4.30**

**[SASA](https://sasa.sjeduhs.kr/sasa-s/main.do?sso=ok)**  
*Mar 2022 - Jan 2025*  
Mechatronics, Robotics, and Automation Engineering  
GPA: **4.18 / 4.30**

---

## Experience

### [KAIST DRCD Lab](https://dynamicrobot.kaist.ac.kr/)
**Research Intern** · Daejeon, South Korea  
**Feb 2026 - Jun 2026**

- Researched **robot dynamics**, **convex optimization**, and **model predictive control** for legged robots.
- Implemented and evaluated control pipelines for **humanoid locomotion** and dynamic robotic systems.

---

## Selected Projects 🛠️

### Convex MPC for Humanoid Robots
**Mar 2026 - May 2026** · Research / Personal Project

Built a convex MPC-based humanoid locomotion framework in **MuJoCo** and **C++**, with a focus on contact-wrench optimization and single-rigid-body dynamics for stable bipedal walking. I wrote a full technical article covering the mathematics (SRB dynamics, condensed QP, yaw-rotated CoP constraints), solver engineering, and the MPC debugging methodology behind it.

Links: [**Technical Article**](https://ispaik06.github.io/convex-mpc-biped/) · [GitHub](https://github.com/ispaik06/convex-mpc-biped) · [Demo Video](https://www.youtube.com/watch?v=-9o8ceG3P2g)

### Panbot
**Jan 2026 - Feb 2026** · Personal Robotics Project

An autonomous pancake-cooking robot built on **LeRobot SO-ARM101**, combining a staged manipulation pipeline with imitation-learning policies. The system used **YOLOv8 segmentation** and a **ResNet18-GRU** state estimator to switch behaviors robustly during pouring, flipping, and plating.

Links: [Control / System Repo](https://github.com/ispaik06/Panbot) · [Vision Repo](https://github.com/ispaik06/Panbot_vision) · [Demo Video](https://www.youtube.com/watch?v=SyGJ2h8aM98)

### mj_ws
**Jan 2026** · Personal Software Project

A lightweight **MuJoCo RL workspace** for rapid robotics experimentation, inspired by IsaacLab-style workflows. I built it to make environment setup, training runs, and logging reproducible with minimal friction.

Links: [GitHub](https://github.com/ispaik06/mj_ws) · [Demo Video](https://www.youtube.com/watch?v=Yu1jwbP7IPo) · [Related Blog Post]({% post_url 2026-01-06-MuJoCo_Workspace %})

### Geochemical Exploration Rover Build Project
**Sep 2024 - Dec 2024** · Project Lead

Led the end-to-end design and manufacturing of a geochemical exploration rover, including the driving system, control stack, onboard computing, and multi-sensor integration.

Links: [Demo Video](https://www.youtube.com/watch?v=ZDiZ3Mzl4nE) · [Related Blog Post]({% post_url 2024-12-10-ROVER %})

### Articulated Self-Balancing Robot
**2025 - 2026** · Club Project

Directed the design and construction of an articulated self-balancing robot, coordinating the mechanical structure, actuator integration, and embedded control implementation.

### Acquisition of Fundamental SLAM Materials for Implementing Indoor Navigation Service in School Environments and Establishment of Mobile Robot Driving System
**Mar 2023 - Dec 2023** · Personal Project

Built a mobile robot system from scratch using **ROS 2**, **Raspberry Pi**, and **Arduino** for indoor mapping and navigation experiments in school environments.

Links: [Demo Video](https://www.youtube.com/watch?v=TXSr7ZR_Jwg) · [Related Blog Post]({% post_url 2023-12-27-SLAM_NAVIGATION %})

### Control Systems Modeling & Feedback Control using Simulink & Arduino
Control-focused system modeling and feedback implementation work using **Simulink**, **Arduino**, and real hardware validation.

Links: [Demo 1](https://www.youtube.com/watch?v=rs6phDzltpg) · [Demo 2](https://www.youtube.com/watch?v=ehPzKYCmSYc) · [Related Blog Post]({% post_url 2024-06-09-[Project]_BallAndBeam %})

### EMG-Powered Smart Pillow
**Automatic Height Adjustment to Reduce Neck Muscle Fatigue During Sleep**

A human-centered mechatronics project using EMG signals to drive automatic pillow height adjustment for improved sleep posture and reduced neck muscle fatigue.

Links: [Demo Video](https://www.youtube.com/watch?v=9mz6idaNPG8)

---

## Leadership & Activities 🚀

### KAIST MR Robotics Club (2025 - 2026)
**Regular Project Team Lead (2025)**  
**Software & Science Team Member, URC 2026**

- In **2025**, led a regular club project to design and build an **articulated self-balancing robot**, coordinating system integration across mechanics, actuation, and embedded control.
- As a **Software & Science** team member for **URC 2026**, contributed to rover development and mission systems for KAIST's University Rover Challenge team.
- The team placed **22nd globally in its first year reaching the URC finals**, a strong result for a first-year finals run.

### SASA R.O.G (Robotics Club)
**President (2022 - 2023)**

- Organized foundational robotics education covering **Arduino** and **Raspberry Pi** for club members.
- Ran team-based robotics projects, helping members move from basic embedded practice to complete working systems.
- Operated robotics booths during **SASA public events**, presenting projects and engaging visitors through demos and explanations.

---

## Technical Stack ⚙️

| Area            | Tools                                                          |
| --------------- | -------------------------------------------------------------- |
| **Programming** | C/C++, Python, Swift, CMake, Git                               |
| **Robotics**    | ROS 2, MuJoCo, Isaac Sim, MATLAB/Simulink                      |
| **Control**     | MPC, robot dynamics, convex optimization, feedback control     |
| **Learning**    | PyTorch, reinforcement learning, imitation learning, ACT, YOLO |
| **Systems**     | SLAM, embedded systems, sensor integration, onboard computing  |

---


## Contact 📬

- **Email:** [ispaik06@kaist.ac.kr](mailto:ispaik06@kaist.ac.kr)
- **GitHub:** [github.com/ispaik06](https://github.com/ispaik06)
- **LinkedIn:** [Inseong Paik](https://www.linkedin.com/in/inseong-paik-7b2982354/)
- **Instagram:** [@_ispaik](https://www.instagram.com/_ispaik/)
