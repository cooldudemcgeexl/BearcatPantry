FROM maven:3.6-jdk-8 AS maven

FROM maven AS devcontainer
RUN apt update && apt install git build-essential -y

CMD [ "tail", "-f", "/dev/null" ]