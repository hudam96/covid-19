<template>
    <div  class="loader-body">
        <div class="loader">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</template>

<style>
    .loader-body {
        position: fixed;
        left: 0;
        top: 0;
        background:#5475A8;
        width: 100%;
        height: 100%;
        z-index: 99999;
    }
    .loader {
        position: absolute;
        top: 50%;
        left: 48%;
    }
    .line {
        animation: expand 1s ease-in-out infinite;
        border-radius: 10px;
        display: inline-block;
        transform-origin: center center;
        margin: 0 3px;
        width: 1px;
        height: 25px;
    }
    .line:nth-child(1) {
        background: #fff;
    }
    .line:nth-child(2) {
        animation-delay: 180ms;
        background: #fff;
    }
    .line:nth-child(3) {
        animation-delay: 360ms;
        background: #fff;
    }
    .line:nth-child(4) {
        animation-delay: 540ms;
        background: #fff;
    }
    @keyframes expand {
        0% {
            transform: scale(1);
        }
        25% {
            transform: scale(2);
        }
    }
</style>
