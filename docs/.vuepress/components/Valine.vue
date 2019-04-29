<template>
    <div id="vcomments">
    </div>
</template>
<script>
export default {
    name: 'Valine',
    mounted() {
        const Valine = require('valine');
        if(typeof window !== 'undefined') {
            this.window = window;
            window.AV = require('leancloud-storage');
        }
        new Valine({
            el: '#vcomments',
            appId: 'Nn9WHqfgh73akU79kaL5O6gP-gzGzoHsz',
            appKey: 'OJjTOKDIYV1iceljtzhUK5nx',
            notify: false,
            verify: false,
            avatar: 'mm',
            placeholder: 'just go go'
        })
    },
}
</script>
