/*
 * Copyright 2018 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

(function($) {

    'use strict';

    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="popover"]').popover();

        $('.popover-dismiss').popover({
            trigger: 'focus'
        })
    });


    function bottomPos(element) {
        return element.offset().top + element.outerHeight();
    }

    // Bootstrap Fixed Header
    $(function() {
        var promo = $(".js-td-cover");
        if (!promo.length) {
            return
        }

        var promoOffset = bottomPos(promo);
        var navbarOffset = $('.js-navbar-scroll').offset().top;

        var threshold = Math.ceil($('.js-navbar-scroll').outerHeight());
        if ((promoOffset - navbarOffset) < threshold) {
            $('.js-navbar-scroll').addClass('navbar-bg-onscroll');
        }


        $(window).on('scroll', function() {
            var navtop = $('.js-navbar-scroll').offset().top - $(window).scrollTop();
            var promoOffset = bottomPos($('.js-td-cover'));
            var navbarOffset = $('.js-navbar-scroll').offset().top;
            if ((promoOffset - navbarOffset) < threshold) {
                $('.js-navbar-scroll').addClass('navbar-bg-onscroll');
            } else {
                $('.js-navbar-scroll').removeClass('navbar-bg-onscroll');
                $('.js-navbar-scroll').addClass('navbar-bg-onscroll--fade');
            }
        });
    });

    // event popup
    $(function (){
        var $popup = $('.sky-event-popup')
        if(!$popup){
            return;
        }
        var key = 'SkyWalkingPopupClosedTime';
        var startDate = $popup.data('startdate');
        var endDate = $popup.data('enddate');
        if(!isShowed(key) && isDuringDate(startDate, endDate)){
            $popup.show()
        }
        $popup.find('.fa-window-close').on('click', function (){
            localStorage.setItem(key, new Date());
            $popup.hide()
        })
        function isShowed(key) {
            var storageTime =  formatDate(localStorage.getItem(key));
            var now =  formatDate(new Date());
            return storageTime === now;
        }

        function formatDate(strTime) {
            const date = new Date(strTime);
            return (
                date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
            );
        }
        function isDuringDate(startDateStr, endDateStr) {
            var currDate = new Date(),
                startDate = new Date(startDateStr),
                endDate = new Date(endDateStr);
            if (currDate >= startDate && currDate <= endDate) {
                return true;
            }
            return false;
        }

    })

}(jQuery));
