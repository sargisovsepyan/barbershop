const BOOKING_OFFSET = 96
const BOOKING_SCROLL_DURATION = 650
let bookingScrollFrame = null

function animateScrollTo(top) {
    if (bookingScrollFrame !== null) {
        window.cancelAnimationFrame(bookingScrollFrame)
    }

    const start = window.pageYOffset
    const distance = top - start
    const startedAt = window.performance.now()

    const step = (now) => {
        const progress = Math.min(1, (now - startedAt) / BOOKING_SCROLL_DURATION)
        const eased = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2

        window.scrollTo(0, start + distance * eased)

        if (progress < 1) {
            bookingScrollFrame = window.requestAnimationFrame(step)
        } else {
            bookingScrollFrame = null
        }
    }

    bookingScrollFrame = window.requestAnimationFrame(step)
}

export function scrollToBooking(behavior = 'smooth') {
    const booking = document.getElementById('booking')
    if (!booking) {
        return false
    }

    const top = booking.getBoundingClientRect().top + window.pageYOffset - BOOKING_OFFSET
    const target = Math.max(0, top)
    if (behavior === 'smooth') {
        animateScrollTo(target)
    } else {
        window.scrollTo(0, target)
    }
    return true
}

export function scrollToBookingWhenReady(attempts = 20, lastTop = null, stableChecks = 0) {
    const booking = document.getElementById('booking')

    if (!booking) {
        if (attempts > 0) {
            window.setTimeout(() => scrollToBookingWhenReady(attempts - 1), 100)
        }
        return
    }

    const absoluteTop = Math.round(booking.getBoundingClientRect().top + window.pageYOffset)
    const nextStableChecks = lastTop !== null && Math.abs(absoluteTop - lastTop) < 2
        ? stableChecks + 1
        : 0

    // The Home sections above booking are populated asynchronously. Give them at
    // least 600ms to settle, then scroll once their measured position is stable.
    if ((attempts <= 14 && nextStableChecks >= 2) || attempts <= 0) {
        scrollToBooking()
        return
    }

    window.setTimeout(
        () => scrollToBookingWhenReady(attempts - 1, absoluteTop, nextStableChecks),
        100
    )
}
