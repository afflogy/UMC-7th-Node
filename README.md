# [UMC-7th-Node]
UMC 7th Node.js Study Git Mission

- 웹 프레임워크 : express
- 사용언어 : JavaScript, TypeScript
- 클라우드 컴퓨팅(웹 서비스) : AWS

## 🚨 github 사용 주의사항
- main에 pr 생성 금지 (**11주차에 CI/CD 사용 예정**)
- 기능 별로 branch 생성
- main업데이트 확인 후 브랜치 생성
- 브랜치 reopen 사용 시, 기존 브랜치 사용 x
- logerror 확인

--------------------------------------------------

## 💡 깃허브 사용법<br/> 
  * 원격 저장소와 지역 저장소 연결<br/> 
    git checkout <최종 개발 브랜치 이름><br/> 
    git pull origin <최종 개발 브랜치 이름><br/> 
    git fetch origin : 원격저장소를 최신화 해줌<br/> 
    git checkout <issue브랜치 이름 or 새로 만든 브랜치><br/> 
    git pull origin <가져올 브랜치 이름><br/> 

  * 깃 브랜치 확인
    git branch

  * 깃 브랜치 선택/생성
    git checkout 브랜치이름

  * 깃 브랜치 삭제
    git branch -d 브랜치이름

  * 원격저장소의 깃 브랜치 삭제
    git push origin -d <원격 브랜치 이름>

  * 이미 올라간 파일 삭제
    git rm --cached -r {삭제할 파일 이름}
    --cached: 원격저장소만 해당
    -r: recursive(재귀적으로), 디렉토리와 하위 내용 삭제
