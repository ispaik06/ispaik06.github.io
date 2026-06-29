---
# the default layout is 'page'
icon: fas fa-info-circle
order: 4
---

## Inseong Paik

> Robotics engineer in training, building control-heavy systems that have to work in the loop, not just look good on paper.

I study **Mechanical Engineering** at [**KAIST**](https://www.kaist.ac.kr/en/) with a double major in **Electrical Engineering**. My work sits at the intersection of **robot dynamics**, **control**, **embedded systems**, and **learning-based robotics**.

This page is the compact version of what I build and how I work. The blog itself is where I keep the longer notes, implementation details, and project logs.

---

## Current Focus

- **Legged robotics:** humanoid locomotion, MPC, contact dynamics, whole-body behavior
- **Robot learning:** reinforcement learning, imitation learning, vision-conditioned policies
- **Field robotics:** navigation, perception, multi-sensor integration, system bring-up
- **Real systems:** getting hardware, firmware, control, and software to cooperate under constraints

---

## Education

| Period | Institution | Program | Notes |
| --- | --- | --- | --- |
| **Feb 2025 - Present** | [**KAIST**](https://www.kaist.ac.kr/en/) | B.S. in Mechanical Engineering, Double Major in Electrical Engineering | GPA **4.10 / 4.30** |
| **Mar 2022 - Jan 2025** | [**SASA**](https://sasa.sjeduhs.kr/sasa-s/main.do?sso=ok) | Mechatronics, Robotics, and Automation Engineering | GPA **4.18 / 4.30** |

---

## Experience

### KAIST DRCD Lab
**Research Intern** · Daejeon, South Korea  
**Feb 2026 - Jun 2026**

- Researched **robot dynamics**, **convex optimization**, and **model predictive control** for legged robots.
- Implemented and evaluated control pipelines for **humanoid locomotion** and dynamic robotic systems.

---

## Selected Projects

### Convex MPC for Humanoid Robots
**Mar 2026 - May 2026** · Research / Personal Project

Built a convex MPC-based humanoid locomotion framework in **MuJoCo** and **C++**, with a focus on contact-wrench optimization and single-rigid-body dynamics for stable bipedal walking.

Links: [GitHub](https://github.com/ispaik06/convex-mpc-biped) · [Demo Video](https://www.youtube.com/watch?v=-9o8ceG3P2g)

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

### Indoor Navigation SLAM Robot System
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

## Leadership & Activities

### KAIST MR Robotics Club
**Project Team Leader** · **2025 - 2026**

- Represented KAIST at the **2026 University Rover Challenge (URC)** in Utah.
- Led system development for autonomous navigation and mission execution.
- Finished **22nd globally** with the team.

---

## Technical Stack

| Area | Tools |
| --- | --- |
| **Programming** | C/C++, Python, Swift, CMake, Git |
| **Robotics** | ROS 2, MuJoCo, Isaac Sim, MATLAB/Simulink |
| **Control** | MPC, robot dynamics, convex optimization, feedback control |
| **Learning** | PyTorch, reinforcement learning, imitation learning, ACT, YOLO |
| **Systems** | SLAM, embedded systems, sensor integration, onboard computing |

---

## Around This Blog

If you are browsing the site for technical content first, these are good entry points:

- [MuJoCo workspace notes]({% post_url 2026-01-06-MuJoCo_Workspace %})
- [ROS 2 communication overview]({% post_url 2024-11-16-ROS 2의 시스템의 기본 통신 방식 %})
- [Indoor SLAM / navigation build log]({% post_url 2023-12-27-SLAM_NAVIGATION %})
- [Ball and Beam control project]({% post_url 2024-06-09-[Project]_BallAndBeam %})

---

## Contact

- **Email:** [ispaik06@kaist.ac.kr](mailto:ispaik06@kaist.ac.kr)
- **GitHub:** [github.com/ispaik06](https://github.com/ispaik06)
- **LinkedIn:** [Inseong Paik](https://www.linkedin.com/in/inseong-paik-7b2982354/)
- **Instagram:** [@_ispaik.0](https://www.instagram.com/_ispaik.0/)
