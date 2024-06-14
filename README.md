# Back-end for Blog Application

## Program folder architecture

```
src/
|-- config/
|-- constants/
|-- common/
|   |-- decorators/
|   |-- filters/
|   |-- guards/
|   |-- pipes/
|   |-- middlewares/
|-- core/
|   |-- database/
|   |-- entity/
|   |-- authentication/
|-- modules/
|   |-- someModule/
|   |   |-- dto/
|   |   |-- dao/
|   |   |-- controller/
|   |   |-- service/
|   |-- app/
|   |   |-- controller/
|   |   |-- service/
|-- app.module.ts
|-- main.ts
```

1. Core와 Feature Module 분리

- Core Modules: 공통적으로 사용되는 설정, 데이터베이스, 인증 등의 기능
- Feature Modules: 특정 기능을 담당하는 모듈

2. 각 Feature Module 내부 구성

- controller: HTTP 요청과 test code
- service: 비즈니스 로직 수행과 test code
- dto: 데이터 전송 객체
- dao: 데이터베이스 접근 객체

3. 공통 모듈 구성

- common: 재사용 가능한 파이프, 가드, 데코레이터, 미들웨어 등
- config: 설정 관련 모듈
- constants: 애플리케이션 전반에 걸쳐 사용되는 상수 정의

## DTO

- 객체와 객체 간의 데이터 전송은 type, interface 사용하지 않고 일관성 있게 DTO로 통일

## Interface

- 응답객체일 때만 DTO 사용하지 않고 Interafce 사용
