$(document).ready(function() {
    // Header scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 20) {
            $('#header').addClass('scrolled');
        } else {
            $('#header').removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('.mobile-menu-toggle').click(function() {
        $('.nav-mobile').toggleClass('active');
        
        // Toggle icon
        const icon = $(this).find('i');
        if (icon.hasClass('fa-bars')) {
            icon.removeClass('fa-bars').addClass('fa-times');
        } else {
            icon.removeClass('fa-times').addClass('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    $('.nav-mobile a').click(function() {
        $('.nav-mobile').removeClass('active');
        $('.mobile-menu-toggle i').removeClass('fa-times').addClass('fa-bars');
    });

    // Smooth scrolling for navigation links
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        if (target && target !== '#') {
            const targetElement = $(target);
            if (targetElement.length) {
                $('html, body').animate({
                    scrollTop: targetElement.offset().top - 80
                }, 800);
            }
        }
    });

    // Form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            message: $('#message').val()
        };
        
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.value-card, .program-card, .event-card, .testimonial-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)'
                });
            }
        });
    }

    // Initial setup for animation
    $('.value-card, .program-card, .event-card, .testimonial-card').css({
        'opacity': '0',
        'transform': 'translateY(30px)',
        'transition': 'all 0.6s ease'
    });

    // Trigger animation on scroll
    $(window).scroll(animateOnScroll);
    
    // Trigger animation on page load
    setTimeout(animateOnScroll, 100);

    // Add hover effect to cards
    $('.value-card, .program-card, .event-card, .testimonial-card, .contact-info-card').hover(
        function() {
            $(this).css('transform', 'translateY(-8px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target > 100) {
                $(element).text(Math.floor(current).toLocaleString() + '+');
            } else {
                $(element).text(Math.floor(current) + '%');
            }
        }, 20);
    }

    // Trigger counter animation when stats are visible
    let statsAnimated = false;
    $(window).scroll(function() {
        if (!statsAnimated) {
            const statsSection = $('.hero-stats');
            if (statsSection.length) {
                const statTop = statsSection.offset().top;
                const statBottom = statTop + statsSection.outerHeight();
                const viewportTop = $(window).scrollTop();
                const viewportBottom = viewportTop + $(window).height();
                
                if (statBottom > viewportTop && statTop < viewportBottom) {
                    statsAnimated = true;
                    
                    $('.stat-number').each(function() {
                        const text = $(this).text();
                        let target;
                        
                        if (text.includes('%')) {
                            target = parseInt(text);
                        } else {
                            target = parseInt(text.replace(/\D/g, ''));
                        }
                        
                        $(this).text('0');
                        animateCounter(this, target);
                    });
                }
            }
        }
    });

    // Add active state to navigation links based on scroll position
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-desktop a, .nav-mobile a').each(function() {
            const href = $(this).attr('href');
            if (href && href.startsWith('#')) {
                const section = $(href);
                if (section.length) {
                    const sectionTop = section.offset().top;
                    const sectionBottom = sectionTop + section.outerHeight();
                    
                    if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                        $('.nav-desktop a, .nav-mobile a').css('color', '#475569');
                        $(this).css('color', '#2563eb');
                    }
                }
            }
        });
    });

    // Parallax effect for hero background
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-background').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
    });

    // Add loading animation
    $('body').css('opacity', '0');
    setTimeout(function() {
        $('body').animate({ opacity: 1 }, 600);
    }, 100);
});
