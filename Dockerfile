FROM quay.io/wildfly/wildfly
ADD target/WebLab3-1.0-SNAPSHOT.war /opt/jboss/wildfly/standalone/deployments/
