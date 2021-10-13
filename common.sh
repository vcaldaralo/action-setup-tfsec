#!/bin/bash -l
set -eo pipefail

export TFSEC_VERSION=${TFSEC_VERSION:="v0.58.14"}

print_title(){
    echo "#####################################################"
    echo "$1"
    echo "#####################################################"
}

get_tfsec() {
    cd /tmp
    curl -Lo ./tfsec "https://github.com/tfsec/tfsec/releases/download/${TFSEC_VERSION}/tfsec-${TFSEC_VERSION}-linux-amd64.tar.gz"
    chmod +x tfsec
    mv -f tfsec /usr/local/bin/tfsec
    tfsec -v
}

install_tfsec() {
    print_title "Installing tfsec: ${TFSEC_VERSION}"
    if ! command -v tfsec; then
        echo "tfsec is missing"
        get_tfsec
    elif ! [[ $(tfsec -v) == *${TFSEC_VERSION}* ]]; then
        echo "tfsec $(tfsec -v) is not desired version"
        get_tfsec
    fi
}

remove_tfsec(){
    print_title "Removing tfsec: ${TFSEC_VERSION}"
    sudo rm -rf /usr/local/bin/tfsec
}